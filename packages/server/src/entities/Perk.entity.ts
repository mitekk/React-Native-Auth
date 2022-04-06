import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";

@ObjectType()
@Entity()
export class Perk extends BaseEntity {
  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String)
  @Property()
  icon!: string;
}
