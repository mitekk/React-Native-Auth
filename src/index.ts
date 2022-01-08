import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Profile } from "./entities/Profile.entity";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // const profile = orm.em.create(Profile, { title: "hello from orm" });
  // await orm.em.persistAndFlush(profile);

  // await orm.em.nativeInsert(Profile, { title: "hello from orm" });

  const profiles = await orm.em.find(Profile, {});
  console.log(profiles);
};

main();
