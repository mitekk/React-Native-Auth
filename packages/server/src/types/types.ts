import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

export type User = {
  id: string;
  name: string;
};

export type Context = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  user: User;
};
