import { User } from "../entities/User.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types/types";
import { AuthResponse } from "./types";
import { Email } from "../handlers/email.handler";
import { LoginInput, RegisterInput, RefreshInput } from "./types/auth";
import JwtUtil from "../utils/jwt.util";
import { RefreshToken } from "../entities/RefreshToken.entity";

@Resolver()
export class AuthResolver {
  @Query(() => AuthResponse)
  async me(@Ctx() { em, user }: Context): Promise<AuthResponse> {
    const foundUser = await em.findOneOrFail(User, { id: user?.id });
    if (foundUser) {
      return { message: `You are a user, known by id: ${foundUser.id}` };
    }
    return { message: `User not found` };
  }

  @Query(() => AuthResponse)
  async tryTokens(
    @Arg("tokens") { accessToken, refreshToken }: RefreshInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    const accessTokenVerify = JwtUtil.verify(accessToken);

    if (accessTokenVerify.errors) {
      const [{ message }] = accessTokenVerify.errors;

      if (message === "TokenExpiredError") {
        const refreshTokenVerify = JwtUtil.verifyRefreshToken(refreshToken);

        if (refreshTokenVerify.errors) {
          return {
            errors: [
              {
                message: "invalid access/refresh token",
              },
            ],
          };
        }

        const accessTokenDecoded = JwtUtil.decode(accessToken);

        if (!accessTokenDecoded || accessTokenDecoded?.errors) {
          return {
            errors: [
              {
                message: "invalid access/refresh token",
              },
            ],
          };
        }

        const { id } = refreshTokenVerify;
        const { id: userId, refreshTokenId } = accessTokenDecoded;

        if (refreshTokenId !== id) {
          return {
            errors: [{ message: "refresh token invalidated!" }],
          };
        }

        const refreshTokenEntity = await em.findOneOrFail(RefreshToken, {
          id: refreshTokenId,
        });

        if (refreshTokenEntity.token === refreshToken) {
          const userEntity = await em.findOneOrFail(User, { id: userId });
          const refreshToken = em.create(RefreshToken, {});
          try {
            await em.persistAndFlush(refreshToken);
            em.removeAndFlush(refreshTokenEntity);
          } catch (error) {
            return {
              errors: [
                {
                  message: error.message,
                },
              ],
            };
          }

          if (userEntity && refreshToken) {
            const accessToken = JwtUtil.sign(userEntity.id, refreshToken.id);

            return {
              message: `userId: ${userEntity.id}`,
              accessToken,
              refreshToken: refreshToken.token,
            };
          }
        }
      }

      return {
        errors: [
          {
            message: "invalid access/refresh token - final",
          },
        ],
      };
    }

    return {
      message: `userId: ${accessTokenVerify.id}`,
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("credentials") { name, email, password }: RegisterInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    if (name?.length < 1) {
      return {
        errors: [
          {
            field: "name",
            message: "minimum length is 1",
          },
        ],
      };
    }

    if (email?.length < 1) {
      return {
        errors: [
          {
            field: "email",
            message: "minimum length is 1",
          },
        ],
      };
    }

    if (password?.length < 1) {
      return {
        errors: [
          {
            field: "password",
            message: "minimum length is 1",
          },
        ],
      };
    }

    const user = em.create(User, {
      name,
      email: email.toLocaleLowerCase(),
      password,
    });

    const refreshToken = em.create(RefreshToken, {});

    return em
      .persistAndFlush([refreshToken, user])
      .then(async () => {
        // Since toknes are created on flush, we need to fetch it
        const refreshTokenEntity = await em.findOneOrFail(RefreshToken, {
          id: refreshToken.id,
        });

        const accessToken = JwtUtil.sign(user.id, refreshTokenEntity.id);
        const { sendVerifyEmail } = Email();
        sendVerifyEmail({ to: email, name, token: accessToken }).catch(
          (error) => console.error(error)
        );

        return { accessToken, refreshToken: refreshTokenEntity.token };
      })
      .catch((error) => {
        if (error.code === "23505") {
          return {
            errors: [
              {
                field: "email",
                message: "Email already exists",
              },
            ],
          };
        }
        return {
          errors: [
            {
              message: "an error occured, please retry",
            },
          ],
        };
      });
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("credentials") { email, password }: LoginInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    const user = await em.findOne(User, { email: email.toLocaleLowerCase() });

    const errorResponse = {
      errors: [
        {
          field: "email or password",
          message: "The email or password is incorrect",
        },
      ],
    };

    return argon2
      .verify(user?.password || "", password)
      .then(async (valid) => {
        if (!user || !valid) {
          return errorResponse;
        }

        const refreshToken = em.create(RefreshToken, {});
        const accessToken = JwtUtil.sign(user.id, refreshToken.id);

        return em
          .persistAndFlush(refreshToken)
          .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
          }))
          .catch(() => errorResponse);
      })
      .catch(() => errorResponse);
  }

  @Mutation(() => AuthResponse)
  async sendRestorePasswordEmail(
    @Arg("email") email: string,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    const user = await em.findOne(User, { email: email.toLocaleLowerCase() });

    const { sendPasswordRestore } = Email();
    const accessToken = JwtUtil.sign(user?.id);
    sendPasswordRestore({ to: email, token: accessToken });

    return { message: `Email was sent to ${email}` };
  }

  @Mutation(() => AuthResponse)
  async resetPassword(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("token") token: string,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    if (email?.length <= 1) {
      return {
        errors: [
          {
            field: "email",
            message: "minimum length is 1",
          },
        ],
      };
    }

    if (password?.length < 1) {
      return {
        errors: [
          {
            field: "password",
            message: "minimum length is 1",
          },
        ],
      };
    }
    const { decoded, errors } = JwtUtil.verify(token);
    if (errors) {
      return { errors };
    }
    const { id } = decoded;
    const user = await em.findOne(User, { id });

    if (user?.email === email) {
      user.password = await argon2.hash(password);
      await em.flush();
    }

    return {
      message: "Password was reset succesfully!",
    };
  }

  @Mutation(() => AuthResponse)
  async verifyEmail(
    @Arg("token") token: string,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    const errorMessage = "something went wrong, please retry";
    const { decoded, errors } = JwtUtil.verify(token);
    if (errors) {
      return { errors };
    }

    const { id } = decoded;
    const user = await em.findOne(User, { id });

    if (!user) {
      return {
        errors: [
          {
            message: errorMessage,
          },
        ],
      };
    }

    user.verified = true;
    await em.flush();

    return {
      message: "verify request was received!",
    };
  }

  @Mutation(() => AuthResponse)
  async refresh(
    @Arg("tokens")
    { accessToken, refreshToken: refreshTokenReceived }: RefreshInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    const { id: userId, refreshTokenId, errors } = JwtUtil.verify(accessToken);
    if (errors) {
      return { errors };
    }

    const refreshTokenEntity = await em.findOne(RefreshToken, {
      id: refreshTokenId,
    });
    const userEntity = await em.findOne(User, { id: userId });
    if (refreshTokenEntity && userEntity) {
      if (refreshTokenEntity.token === refreshTokenReceived) {
        const refreshToken = em.create(RefreshToken, {});
        try {
          await em.persistAndFlush(refreshToken);
        } catch (error) {
          return {
            errors: [
              {
                message: error.message,
              },
            ],
          };
        }
        const accessToken = JwtUtil.sign(userEntity.id, refreshToken.id);

        return { accessToken, refreshToken: refreshToken.token };
      }
      em.removeAndFlush(refreshTokenEntity);
    }

    return {
      errors: [
        {
          message: "Refresh token failed, please login",
        },
      ],
    };
  }
}
