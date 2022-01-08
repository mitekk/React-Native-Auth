import { User } from "../entities/User.entity";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";

@InputType()
class CredentialsInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("credentials") { username, password }: CredentialsInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    if (username?.length <= 1) {
      return {
        errors: [
          {
            field: "username",
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

    const user = em.create(User, { username, password });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505" || error.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
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
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("credentials") { username, password }: CredentialsInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }
    const valid = argon2.verify(user.password, password);
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

    return { user };
  }
}
