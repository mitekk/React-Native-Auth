import { __prod__ } from "./constants";
import { Profile } from "./entities/Profile.entity";
import { MikroORM } from "@mikro-orm/core";

export default {
  migrations: {
    path: "./migrations",
    pattern: /^[\w-]+\d+\.[tj]s$/,
    emit: "js",
  },
  entities: [Profile],
  dbName: "bucket",
  type: "postgresql",
  user: "postgres",
  password: "postgres",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
