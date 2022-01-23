import { ObjectType, Field } from "type-graphql";
import { QueryError } from "./error";
import { Perk } from "../../entities/Perk.entity";

@ObjectType()
class PerkResponse {
  @Field(() => [QueryError], { nullable: true })
  errors?: QueryError[];
  @Field(() => [Perk], { nullable: true })
  data?: Perk | Perk[] | null;
}

export { PerkResponse };
