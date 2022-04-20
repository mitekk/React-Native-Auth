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
  async me(@Ctx() { em, userId }: Context): Promise<AuthResponse> {
    const user = await em.findOneOrFail(User, { id: userId });
    if (user) {
      return { message: `You are a user, known by id: ${user.id}` };
    }
    return { message: `User not found` };
  }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("credentials") registerInput: RegisterInput,
    @Ctx() { em }: Context
  ): Promise<AuthResponse> {
    try {
      await registerSchema.validate(registerInput);
      const { name, email, password } = registerInput;

      const userEntity = em.create(User, {
        name: capitalize(name),
        email: email.toLocaleLowerCase(),
        password,
      });

      const accessToken = JwtUtil.sign(
        { userId: userEntity.id },
        TokenType.AccessToken
      );

      const refreshTokenId = v4();
      const refreshToken = JwtUtil.sign(
        { userId: userEntity.id, refreshTokenId },
        TokenType.RefreshToken
      );

      const verifyToken = JwtUtil.sign(
        { userId: userEntity.id },
        TokenType.VerifyEmail
      );

      const refreshTokenEntity = em.create(RefreshToken, {
        id: refreshTokenId,
        userId: userEntity.id,
        token: refreshToken,
      });

      await em.persistAndFlush([userEntity, refreshTokenEntity]);

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
        userId: user.id,
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

      if (!user.verified) {
        throw new Error("user is not verified");
      }
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
      const { decoded, error } = JwtUtil.verify(token, TokenType.ResetPassword);
      if (error) {
        throw new Error(error.message);
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
      const { decoded, error } = JwtUtil.verify(token, TokenType.VerifyEmail);
      if (error) {
        throw new Error(error.message);
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
      const { userId, refreshTokenId, error } = JwtUtil.verify(
        refreshToken,
        TokenType.RefreshToken
      );

      if (error) {
        throw new Error(error.message);
      }

      const refreshTokenEntity = await em.findOneOrFail(RefreshToken, {
        id: refreshTokenId,
      });

      await em.findOneOrFail(User, {
        id: userId,
      });

      if (refreshTokenEntity.token === refreshToken) {
        const accessToken = JwtUtil.sign({ userId }, TokenType.AccessToken);

        return {
          accessToken,
          refreshToken,
          message: "access token was refreshed",
        };
      }

      throw new Error("refresh token is not recognized");
    } catch (error) {
      console.error(error);

      return {
        errors: [
          {
            message: "refresh token failed, please login",
          },
        ],
      };
    }
  }
}
