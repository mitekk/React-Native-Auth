import { Allowance } from "../entities/Allowance.entity";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";
import { AllowanceInput, AllowanceResponse } from "./types";

@Resolver()
export class AllowanceResolver {
  @Query(() => [AllowanceResponse])
  async profiles(@Ctx() { em, user }: Context): Promise<AllowanceResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const allowance = await em.find(Allowance, {});
    return { data: allowance };
  }

  @Query(() => AllowanceResponse, { nullable: true })
  async profile(
    @Arg("id") id: string,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse | null> {
    if (!user) throw new Error("You are not authenticated!");
    const allowance = await em.findOne(Allowance, { id });
    return { data: allowance };
  }

  @Mutation(() => AllowanceResponse)
  async createAllowance(
    @Arg("allowance") allowance: AllowanceInput,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse> {
    if (!user) throw new Error("You are not authenticated!");
    const newAllowance = em.create(Allowance, allowance);
    await em.persistAndFlush(newAllowance);
    return { data: newAllowance };
  }

  @Mutation(() => AllowanceResponse, { nullable: true })
  async updateAllowance(
    @Arg("allowance") allowance: AllowanceInput,
    @Ctx() { em, user }: Context
  ): Promise<AllowanceResponse | null> {
    if (!user) throw new Error("You are not authenticated!");
    const existing = await em.findOne(Allowance, { id: allowance.id });

    if (!existing) {
      return {
        errors: [
          {
            code: 404,
            message: "allowance does not exist",
          },
        ],
      };
    }

    if (typeof allowance !== "undefined") {
      const updatedAllowane = { ...existing, allowance };
      await em.persistAndFlush(updatedAllowane);
      return { data: updatedAllowane };
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
