import { Profile } from "../entities/Profile.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile])
  profiles(@Ctx() { em, user }: Context): Promise<Profile[]> {
    if (!user) throw new Error("You are not authenticated!");
    return em.find(Profile, {});
  }

  @Query(() => Profile, { nullable: true })
  profile(
    @Arg("uuid") uuid: string,
    @Ctx() { em, user }: Context
  ): Promise<Profile | null> {
    if (!user) throw new Error("You are not authenticated!");
    return em.findOne(Profile, { uuid });
  }

  @Mutation(() => Profile)
  async createProfile(
    @Arg("nickname") nickname: string,
    @Ctx() { em, user }: Context
  ): Promise<Profile> {
    if (!user) throw new Error("You are not authenticated!");
    const profile = em.create(Profile, { nickname });
    await em.persistAndFlush(profile);
    return profile;
  }

  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("uuid") uuid: string,
    @Arg("nickname") nickname: string,
    @Ctx() { em, user }: Context
  ): Promise<Profile | null> {
    if (!user) throw new Error("You are not authenticated!");
    const profile = await em.findOne(Profile, { uuid });

    if (!profile) {
      return null;
    }

    if (typeof nickname !== "undefined") {
      profile.nickname = nickname;
      await em.persistAndFlush(profile);
    }

    return profile;
  }

  @Mutation(() => Boolean)
  async deleteProfile(
    @Arg("uuid") uuid: string,
    @Ctx() { em, user }: Context
  ): Promise<boolean> {
    if (!user) throw new Error("You are not authenticated!");
    await em.nativeDelete(Profile, { uuid });
    return true;
  }
}
