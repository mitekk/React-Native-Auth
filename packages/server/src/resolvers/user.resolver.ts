import { User } from "../entities/User.entity";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../types/types";

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Ctx() { em, userId }: Context): Promise<User> {
    return em.findOneOrFail(User, { id: userId });
  }
}
