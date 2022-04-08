import { Entity, Property } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class RefreshToken extends BaseEntity {
  @Property()
  token: string = v4();
}
