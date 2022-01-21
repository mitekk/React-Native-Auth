import { ProfileIcon } from "../entities/ProfileIcon.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { ProfileIconsResponse, ProfileIconInput } from "./types";

@Resolver()
export class ProfileIconsResolver {
  @Query(() => ProfileIconsResponse)
  async icons(@Ctx() { em }: Context): Promise<ProfileIconsResponse> {
    const icons = await em.find(ProfileIcon, {});
    return { icons };
  }

  @Mutation(() => ProfileIconsResponse)
  async register(
    @Arg("icon") icon: ProfileIconInput,
    @Ctx() { em }: Context
  ): Promise<ProfileIconsResponse> {
    try {
      const iconQuery = em.create(ProfileIcon, icon);
      await em.persistAndFlush(iconQuery);
    } catch (error) {
      return {
        errors: [
          {
            field: "general",
            message: error.message,
          },
        ],
      };
    }

    return { icons: [icon] };
  }
}
