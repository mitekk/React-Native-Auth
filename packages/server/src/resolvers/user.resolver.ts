import { User } from "../entities/User.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Context } from "../types/types";
import { jwt_secret } from "../constants";
import { UserResponse, CredentialsInput } from "./types";

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async me(@Ctx() { em, user }: Context): Promise<UserResponse> {
    const foundUser = await em.findOneOrFail(User, { id: user?.id });

    return { user: foundUser };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("credentials") { email, password }: CredentialsInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    if (email?.length <= 1) {
      return {
        errors: [
          {
            field: "email",
            message: "minimum length is 2",
          },
        ],
      };
    }

    if (password?.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "minimum length is 6",
          },
        ],
      };
    }

    const user = em.create(User, {
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
              message: "already exists",
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
    @Arg("credentials") { email, password }: CredentialsInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: email.toLocaleLowerCase() });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password doesn't match",
          },
        ],
      };
    }

    const token = jwt.sign({ id: user.id }, jwt_secret, {
      expiresIn: "1y",
    });

    return { user, token };
  }
}
