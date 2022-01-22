import { ProfileIcon } from "../entities/ProfileIcon.entity";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { ProfileIconsResponse } from "./types";

@Resolver()
export class ProfileIconsResolver {
  @Query(() => ProfileIconsResponse)
  async icons(@Ctx() { em }: Context): Promise<ProfileIconsResponse> {
    const icons = await em.find(ProfileIcon, {});
    return { icons };
  }
}
