import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { Perk } from "../entities/Perk.entity";
import { PerkResponse } from "./types";
import { User } from "../entities/User.entity";

@Resolver()
export class PerksResolver {
  @Query(() => [PerkResponse])
  async perks(@Ctx() { em, userId }: Context): Promise<PerkResponse> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

    const perks = await em.find(Perk, {});
    return { data: perks };
  }
}
