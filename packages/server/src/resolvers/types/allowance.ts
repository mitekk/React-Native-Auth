import { Allowance } from "../../entities/Allowance.entity";
import { ObjectType, Field, InputType, Int, ID } from "type-graphql";
import { QueryError } from "./error";

@InputType()
class AllowanceInput {
  @Field(() => ID)
  id?: string;

  @Field(() => Int)
  amount!: number;

  @Field(() => Int)
  initBalance!: number;

  @Field(() => String)
  interval!: string;

  @Field(() => String)
  startFrom!: Date;

  @Field(() => ID)
  profileId!: string;
}

@ObjectType()
class AllowanceResponse {
  @Field(() => [QueryError], { nullable: true })
  errors?: QueryError[];
  @Field(() => [Allowance], { nullable: true })
  data?: Allowance | Allowance[] | null;
}

export { AllowanceInput, AllowanceResponse };
