import { ProfileIcon } from "../entities/ProfileIcon.entity";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { ProfileIconResponse } from "./types";

@Resolver()
export class ProfileIconResolver {
  @Query(() => ProfileIconResponse)
  async icons(@Ctx() { em }: Context): Promise<ProfileIconResponse> {
    const icons = await em.find(ProfileIcon, {});
    return { data: icons };
  }
}
