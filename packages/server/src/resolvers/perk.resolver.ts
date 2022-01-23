import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { Perk } from "../entities/Perk.entity";
import { PerkResponse } from "./types";

@Resolver()
export class PerksResolver {
  @Query(() => [PerkResponse])
  async perks(@Ctx() { em, user }: Context): Promise<PerkResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const perks = await em.find(Perk, {});
    return { data: perks };
  }
}
