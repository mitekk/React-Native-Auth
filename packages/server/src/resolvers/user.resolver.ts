import { User } from "../entities/User.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Context } from "../types/types";
import { jwt_secret } from "../constants";
import { UserResponse } from "./types";
import { Email } from "../handlers/email.handler";
import { LoginInput, RegisterInput } from "./types/user";

type resetPasswordJWT = {
  id: string;
};

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async me(@Ctx() { em, user }: Context): Promise<UserResponse> {
    const foundUser = await em.findOneOrFail(User, { id: user?.id });
    return { user: foundUser };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("credentials") { name, email, password }: RegisterInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
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

    try {
      await em.persistAndFlush(user);
    } catch (error) {
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
            field: "general",
            message: error.message,
          },
        ],
      };
    }

    const token = jwt.sign({ ...user }, jwt_secret, {
      expiresIn: "1y",
    });

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("credentials") { email, password }: LoginInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
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
      .then((valid) => {
        if (!user || !valid) {
          return errorResponse;
        }

        const token = jwt.sign({ id: user.id }, jwt_secret, {
          expiresIn: "1y",
        });
        return { user, token };
      })
      .catch(() => {
        return errorResponse;
      });
  }

  @Mutation(() => UserResponse)
  async sendRestorePasswordEmail(
    @Arg("email") email: string,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: email.toLocaleLowerCase() });

    if (user) {
      const { sendPasswordRestore } = Email();
      const token = jwt.sign({ id: user.id }, jwt_secret, {
        expiresIn: "1h",
      });
      sendPasswordRestore({ to: email, token });
    }

    return {};
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("token") token: string,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
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

    if (password?.length <= 1) {
      return {
        errors: [
          {
            field: "password",
            message: "minimum length is 1",
          },
        ],
      };
    }

    const { id } = jwt.decode(token) as resetPasswordJWT;

    const user = await em.findOne(User, { id });

    if (user?.email === email) {
      user.password = await argon2.hash(password);
      await em.flush();
    }

    return {};
  }
}
