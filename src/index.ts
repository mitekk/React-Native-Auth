import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello.resolver";
import { ProfileResolver } from "./resolvers/profile.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { Context } from "./types";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();

  // https://github.com/apollographql/apollo-server/issues/5775#issuecomment-936896592
  // app.set("trust proxy", !__prod__);

  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ auth_pass: "sOmE_sEcUrE_pAsS" });

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: __prod__ ? "lax" : "none", //csrf
        secure: true,
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, ProfileResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }: Context) => ({ em: orm.em, req, res }),
  });

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app, cors: __prod__ });
    app.listen(4000, () => {
      console.log("server started on localhost:4000");
    });
  });
};

main();
