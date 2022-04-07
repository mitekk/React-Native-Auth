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
  token!: string;
  @Field()
  refreshToken!: string;
}

@ObjectType()
class AuthResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

export { RegisterInput, LoginInput, AuthResponse, RefreshInput };
