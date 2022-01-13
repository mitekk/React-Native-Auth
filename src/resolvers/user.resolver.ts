import { User } from "../entities/User.entity";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Context } from "../types/types";
import { jwt_secret } from "../constants";

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

  @Field(() => String)
  token?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, user }: Context): Promise<User | null> {
    return await em.findOneOrFail(User, { uuid: user?.uuid });
  }

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

    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, { username, password: hashedPassword });

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

    const token = jwt.sign({ ...user }, jwt_secret, {
      expiresIn: "1y",
    });

    return { user, token };
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

    const token = jwt.sign({ uuid: user.uuid }, "jwt_sOmE_sEcUrE_pAsSECRET", {
      expiresIn: "1y",
    });

    return { user, token };
  }
}
