import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { Perk } from "src/entities/Perk.entity";

@Resolver()
export class PerksResolver {
  @Query(() => [Perk])
  perks(@Ctx() { em, user }: Context): Promise<Perk[]> {
    if (!user) throw new Error("You are not authenticated!");
    return em.find(Perk, {});
  }
}
