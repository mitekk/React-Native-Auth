import { InputType, Field, ObjectType } from "type-graphql";
import { FieldError } from ".";

@InputType()
class RegisterInput {
  @Field()
  name!: string;
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@InputType()
class LoginInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@InputType()
class RefreshInput {
  @Field()
  accessToken!: string;
  @Field()
  refreshToken!: string;
}

@ObjectType()
class AuthResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
class ResetPasswordResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  message?: string;
}

export {
  RegisterInput,
  LoginInput,
  AuthResponse,
  RefreshInput,
  ResetPasswordResponse,
};
