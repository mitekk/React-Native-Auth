import { User } from "../../entities/User.entity";
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

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

export { RegisterInput, LoginInput, UserResponse };
