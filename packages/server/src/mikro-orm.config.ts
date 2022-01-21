import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { Profile } from "./entities/Profile.entity";
import { User } from "./entities/User.entity";
import { ProfileIcon } from "./entities/ProfileIcon.entity";

export default {
  migrations: {
    path: "./migrations",
    pattern: /^[\w-]+\d+\.[tj]s$/,
    emit: "js",
  },
  entities: [Profile, ProfileIcon, User],
  dbName: "bucket",
  type: "postgresql",
  user: "postgres",
  password: "postgres",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
