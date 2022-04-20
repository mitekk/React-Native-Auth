import { Profile } from "../entities/Profile.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { ProfileInput, ProfileResponse } from "./types";
import { User } from "../entities/User.entity";

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  async profiles(@Ctx() { em, userId }: Context): Promise<Profile[]> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

    return em.find(Profile, {});
  }

  @Query(() => Profile, { nullable: true })
  async profile(
    @Arg("id") id: string,
    @Ctx() { em, userId }: Context
  ): Promise<Profile | null> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

    return em.findOne(Profile, { id });
  }

  @Mutation(() => ProfileResponse)
  async createProfile(
    @Arg("profile") profile: ProfileInput,
    @Ctx() { em, userId }: Context
  ): Promise<ProfileResponse> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

    const newProfile = em.create(Profile, profile);
    await em.persistAndFlush(newProfile);
    return { data: newProfile };
  }

  @Mutation(() => ProfileResponse, { nullable: true })
  async updateProfile(
    @Arg("profile") profile: ProfileInput,
    @Ctx() { em, userId }: Context
  ): Promise<ProfileResponse> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

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
    @Ctx() { em, userId }: Context
  ): Promise<boolean> {
    const user = await em.findOneOrFail(User, { id: userId });
    console.log(user);

    await em.nativeDelete(Profile, { id });
    return true;
  }
}
