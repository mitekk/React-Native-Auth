import { ObjectType, Field, InputType, Int, ID } from "type-graphql";
import { QueryError } from "./error";
import { Profile } from "../../entities/Profile.entity";

@InputType()
class ProfileInput {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  birthdate!: Date;

  @Field(() => String)
  avatar!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  mediaUri: string;

  @Field(() => String)
  themePref!: string;

  @Field(() => Int)
  balance!: number;

  @Field(() => ID)
  userId!: string;
}

@ObjectType()
class ProfileResponse {
  @Field(() => [QueryError], { nullable: true })
  errors?: QueryError[];
  @Field(() => [Profile], { nullable: true })
  data?: Profile | Profile[] | null;
}

export { ProfileInput, ProfileResponse };
