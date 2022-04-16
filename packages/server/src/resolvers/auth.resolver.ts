import { User } from "../entities/User.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { capitalize } from "lodash";
import { Context } from "../types/types";
import { AuthResponse } from "./types";
import { Email } from "../managers/email.manager";
import {
  LoginInput,
  RegisterInput,
  RefreshInput,
  ResetPasswordResponse,
} from "./types/auth";
import JwtUtil, { TokenType } from "../utils/jwt.util";
import { RefreshToken } from "../entities/RefreshToken.entity";
import {
  loginSchema,
  passwordSchema,
  registerSchema,
  resetPasswordSchema,
} from "./validation/auth.validation";
import { v4 } from "uuid";

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

  // @Query(() => AuthResponse)
  // async testRefreshTokens(
  //   @Arg("tokens") { accessToken, refreshToken }: RefreshInput,
  //   @Ctx() { em }: Context
  // ): Promise<AuthResponse> {
  //   const accessTokenVerify = JwtUtil.verify(
  //     accessToken,
  //     TokenType.AccessToken
  //   );

  //   try {
  //     if (accessTokenVerify.errors) {
  //       const [{ message }] = accessTokenVerify.errors;

  //       if (message === "TokenExpiredError") {
  //         const refreshTokenVerify = JwtUtil.verify(
  //           refreshToken,
  //           TokenType.RefreshToken
  //         );

  //         if (refreshTokenVerify.errors) {
  //           throw new Error("Verify refresh token failed");
  //         }

  //         const accessTokenDecoded = JwtUtil.decode(accessToken);

  //         if (!accessTokenDecoded || accessTokenDecoded?.errors) {
  //           throw new Error("Decode access token failed");
  //         }

  //         const { id } = refreshTokenVerify;
  //         const { id: userId, refreshTokenId } = accessTokenDecoded;

  //         if (refreshTokenId !== id) {
  //           throw new Error("Refresh token was invalidated");
  //         }

  //         const refreshTokenEntity = await em.findOneOrFail(RefreshToken, {
  //           id: refreshTokenId,
  //         });

  //         if (refreshTokenEntity.token !== refreshToken) {
  //           throw new Error("Refresh token could not be validated");
  //         }

  //         const userEntity = await em.findOneOrFail(User, { id: userId });
  //         const newRefreshToken = em.create(RefreshToken, {});
  //         await em.persistAndFlush(newRefreshToken);
  //         em.removeAndFlush(refreshTokenEntity);

  //         if (!userEntity || !newRefreshToken) {
  //           throw new Error("Failed to generate new refresh token");
  //         }
  //         const newAccessToken = JwtUtil.sign(
  //           userEntity.id,
  //           TokenType.AccessToken,
  //           newRefreshToken.id
  //         );

  //         return {
  //           message: `userId: ${userEntity.id}`,
  //           accessToken: newAccessToken,
  //           refreshToken: newRefreshToken.token,
  //         };
  //       }
  //     }

  //     return {
  //       message: `userId: ${accessTokenVerify.id}`,
  //       accessToken,
  //       refreshToken,
  //     };
  //   } catch (error) {
  //     console.error(error);

  //     return {
  //       errors: [
  //         {
  //           message: "Unauthorized",
  //         },
  //       ],
  //     };
  //   }
  // }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("credentials") registerInput: RegisterInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      await registerSchema.validate(registerInput);
      const { name, email, password } = registerInput;

      const user = em.create(User, {
        name: capitalize(name),
        email: email.toLocaleLowerCase(),
        password,
      });

      const accessToken = JwtUtil.sign(
        { userId: user.id },
        TokenType.AccessToken
      );

      const refreshToken = JwtUtil.sign(
        { userId: user.id },
        TokenType.RefreshToken
      );

      const verifyToken = JwtUtil.sign(
        { userId: user.id },
        TokenType.VerifyEmail
      );

      console.log("user.id", user.id);

      em.create(RefreshToken, { userId: user.id, token: refreshToken });

      await em.persistAndFlush([refreshToken, user]);

      const { sendVerifyEmail } = Email();
      sendVerifyEmail({ to: email, name, token: verifyToken });

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);

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
    }
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("credentials") loginInput: LoginInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      await loginSchema.validate(loginInput);
      const { email, password } = loginInput;

      const user = await em.findOneOrFail(User, {
        email: email.toLocaleLowerCase(),
      });

      const valid = await argon2.verify(user?.password || "", password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const refreshTokenId = v4();
      const refreshToken = JwtUtil.sign(
        { userId: user.id, refreshTokenId },
        TokenType.RefreshToken
      );

      const refreshTokenEntity = em.create(RefreshToken, {
        id: refreshTokenId,
        token: refreshToken,
      });
      await em.persistAndFlush(refreshTokenEntity);

      const accessToken = JwtUtil.sign(
        { userId: user.id },
        TokenType.AccessToken
      );

      return {
        accessToken,
        refreshToken,
        message: "Login successful",
      };
    } catch (error) {
      console.error(error);

      return {
        errors: [
          {
            message: "The email or password is incorrect",
          },
        ],
      };
    }
  }

  @Mutation(() => ResetPasswordResponse)
  async sendResetPasswordEmail(
    @Arg("email") email: string,
    @Ctx() { em }: Context
  ): Promise<ResetPasswordResponse> {
    try {
      await passwordSchema.validate({ email });
      const user = await em.findOneOrFail(User, {
        email: email.toLocaleLowerCase(),
      });

      const { sendPasswordReset } = Email();
      const resetToken = JwtUtil.sign(
        { userId: user?.id },
        TokenType.ResetPassword
      );
      sendPasswordReset({ to: email, token: resetToken });

      return { message: `Email was sent to ${email}` };
    } catch (error) {
      console.error(error);

      return {
        errors: [
          {
            message: "Send reset password email failed",
          },
        ],
      };
    }
  }

  @Mutation(() => AuthResponse)
  async resetPassword(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("token") token: string,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      resetPasswordSchema.validate({ email, password });
      const { decoded, errors } = JwtUtil.verify(
        token,
        TokenType.ResetPassword
      );
      if (errors) {
        return { errors };
      }
      const { userId } = decoded;
      const user = await em.findOneOrFail(User, { id: userId });

      if (user.email === email) {
        user.password = await argon2.hash(password);
        await em.flush();
      }

      return {
        message: "Password was reset succesfully!",
      };
    } catch (error) {
      console.error(error);

      return {
        errors: [{ message: "Password was reset failed" }],
      };
    }
  }

  @Mutation(() => AuthResponse)
  async verifyEmail(
    @Arg("token") token: string,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      const { decoded, errors } = JwtUtil.verify(token, TokenType.VerifyEmail);
      if (errors) {
        return { errors };
      }

      const { userId } = decoded;
      const user = await em.findOneOrFail(User, { id: userId });

      user.verified = true;
      await em.flush();

      return {
        message: "verify request was received!",
      };
    } catch (error) {
      console.error(error);
      return {
        errors: [{ message: "something went wrong, please retry" }],
      };
    }
  }

  @Mutation(() => AuthResponse)
  async refresh(
    @Arg("tokens")
    { refreshToken }: RefreshInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      const { decoded, errors } = JwtUtil.verify(
        refreshToken,
        TokenType.RefreshToken
      );
      if (errors) {
        throw new Error(errors[0]?.message);
      }

      const { userId, refreshTokenId } = decoded;

      const refreshTokenEntity = await em.findOneOrFail(RefreshToken, {
        id: refreshTokenId,
      });

      await em.findOneOrFail(User, {
        id: userId,
      });

      if (refreshTokenEntity.token === refreshToken) {
        const accessToken = JwtUtil.sign({ userId }, TokenType.AccessToken);

        return { accessToken, refreshToken };
      }

      throw new Error("Tokens do not match");
    } catch (error) {
      console.error(error);

      return {
        errors: [
          {
            message: "Refresh token failed, please login",
          },
        ],
      };
    }
  }
}
