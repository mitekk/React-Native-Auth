import { Profile } from "../entities/Profile.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { ProfileInput, ProfileResponse } from "./types";

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  profiles(@Ctx() { em, user }: Context): Promise<Profile[]> {
    if (!user) throw new Error("You are not authenticated!");
    return em.find(Profile, {});
  }

  @Query(() => Profile, { nullable: true })
  profile(
    @Arg("id") id: string,
    @Ctx() { em, user }: Context
  ): Promise<Profile | null> {
    if (!user) throw new Error("You are not authenticated!");
    return em.findOne(Profile, { id });
  }

  @Mutation(() => ProfileResponse)
  async createProfile(
    @Arg("profile") profile: ProfileInput,
    @Ctx() { em, user }: Context
  ): Promise<ProfileResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const newProfile = em.create(Profile, profile);
    await em.persistAndFlush(newProfile);
    return { data: newProfile };
  }

  @Mutation(() => ProfileResponse, { nullable: true })
  async updateProfile(
    @Arg("profile") profile: ProfileInput,
    @Ctx() { em, user }: Context
  ): Promise<ProfileResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const existing = await em.findOne(Profile, { id: profile.id });

    if (!existing) {
      return {
        errors: [
          {
            code: 404,
            message: "profile does not exist",
          },
        ],
      };
    }

    if (typeof profile !== "undefined") {
      const updatedProfile = { ...existing, profile };
      await em.persistAndFlush(updatedProfile);
      return { data: updatedProfile };
    }

    return profile;
  }

  @Mutation(() => Boolean)
  async deleteProfile(
    @Arg("id") id: string,
    @Ctx() { em, user }: Context
  ): Promise<boolean> {
    if (!user) throw new Error("You are not authenticated!");
    await em.nativeDelete(Profile, { id });
    return true;
  }
}
