import { Entity, Property } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";

@ObjectType()
@Entity()
export class RefreshToken extends BaseEntity {
  @Property()
  userId: string;
  @Property()
  token: string;
}
