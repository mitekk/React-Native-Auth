import { Allowance } from "src/entities/Allowance.entity";
import { ObjectType, Field } from "type-graphql";
import { QueryError } from "./error";

@ObjectType()
class AllowanceResponse {
  @Field(() => [QueryError], { nullable: true })
  errors?: QueryError[];
  @Field(() => [Allowance], { nullable: true })
  allowance?: Allowance | Allowance[] | null;
}

export { AllowanceResponse };
