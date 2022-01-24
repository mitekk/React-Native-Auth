import "reflect-metadata";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import jwt from "jsonwebtoken";
import { jwt_secret, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { ProfileResolver } from "./resolvers/profile.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { Context } from "./types/types";
import { ProfileIconResolver } from "./resolvers/profileIcon.resolver";
import { AllowanceResolver } from "./resolvers/allowance.resolver";
import { PerksResolver } from "./resolvers/perk.resolver";

export const Application = () => {
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  const getUser = (token?: string) => {
    try {
      if (token) {
        return jwt.verify(JSON.parse(token), jwt_secret);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    connect: async () => {
      try {
        orm = await MikroORM.init(microConfig);
        const migrator = orm.getMigrator();
        const migrations = await migrator.getPendingMigrations();
        if (migrations && migrations.length > 0) {
          await migrator.up();
        }
      } catch (error) {
        console.error("📌 Could not connect to the database", error);
        throw Error(error);
      }
    },
    init: async () => {
      const app = express();
      try {
        const apolloServer = new ApolloServer({
          schema: await buildSchema({
            resolvers: [
              ProfileResolver,
              UserResolver,
              ProfileIconResolver,
              AllowanceResolver,
              PerksResolver,
            ],
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
      } catch (error) {
        console.error("📌 Could not start server", error);
      }
    },
  };
};
