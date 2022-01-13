import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

export type User = {
  uuid: string;
  nickname: string;
  avatar: string;
  birthdate: string;
  color: string;
};

export type Context = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  user: User;
};
