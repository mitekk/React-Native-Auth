import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import jwt from "jsonwebtoken";
import { ProfileResolver } from "./resolvers/profile.resolver";
import { UserResolver } from "./resolvers/user.resolver";
// import redis from "redis";
import { Context } from "./types";

const getUser = (token?: string) => {
  try {
    if (token) {
      return jwt.verify(JSON.parse(token), "jwt_sOmE_sEcUrE_pAsSECRET");
    }
    return null;
  } catch (error) {
    return null;
  }
};

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();

  // const redisClient = redis.createClient({ auth_pass: "sOmE_sEcUrE_pAsS" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProfileResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }: Context) => {
      const token = req.headers.authorization;
      const user = getUser(token?.replace("Bearer", ""));

      return { em: orm.em, req, res, user };
    },
  });

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
      console.log("server started on localhost:4000");
    });
  });
};

main();
