import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from ".";

@InputType()
class ProfileIconInput {
  @Field()
  name: string;
  @Field()
  type: string;
}

@ObjectType()
class FieldIcon {
  @Field()
  name: string;
  @Field()
  type: string;
}

@ObjectType()
class ProfileIconResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => [FieldIcon], { nullable: true })
  icons?: FieldIcon[];
}

export { ProfileIconInput, FieldIcon, ProfileIconResponse };
