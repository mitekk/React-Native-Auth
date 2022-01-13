import { Application } from "./application";

const main = async () => {
  const { connect, init } = Application();
  await connect();
  await init();
};

main();
