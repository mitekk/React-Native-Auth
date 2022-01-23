import { Allowance } from "src/entities/Allowance.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { AllowanceResponse } from "./types/allowance";

@Resolver()
export class AllowanceResolver {
  @Query(() => [AllowanceResponse])
  async profiles(@Ctx() { em, user }: Context): Promise<AllowanceResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const allowance = await em.find(Allowance, {});
    return { allowance };
  }

  @Query(() => AllowanceResponse, { nullable: true })
  async profile(
    @Arg("id") id: string,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse | null> {
    if (!user) throw new Error("You are not authenticated!");
    const allowance = await em.findOne(Allowance, { id });
    return { allowance };
  }

  @Mutation(() => AllowanceResponse)
  async createAllowance(
    @Arg("name") name: string,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const allowance = em.create(Allowance, { name });
    await em.persistAndFlush(allowance);
    return { allowance };
  }

  @Mutation(() => AllowanceResponse, { nullable: true })
  async updateAllowance(
    @Arg("id") id: string,
    @Arg("allowance") allowance: Allowance,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse | null> {
    if (!user) throw new Error("You are not authenticated!");
    const existing = await em.findOne(Allowance, { id });

    if (!existing) {
      return null;
    }

    if (typeof allowance !== "undefined") {
      const updatedAllowane = { ...existing, allowance };
      await em.persistAndFlush(updatedAllowane);
      return { allowance: updatedAllowane };
    }

    return null;
  }

  @Mutation(() => Boolean)
  async deleteAllowance(
    @Arg("id") id: string,
    @Ctx() { em, user }: Context
  ): Promise<boolean> {
    if (!user) throw new Error("You are not authenticated!");
    await em.nativeDelete(Allowance, { id });
    return true;
  }
}
