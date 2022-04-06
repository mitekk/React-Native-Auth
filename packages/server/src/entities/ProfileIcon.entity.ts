import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";

@ObjectType()
@Entity()
export class ProfileIcon extends BaseEntity {
  @Field(() => String)
  @Property({ unique: true })
  name!: string;

  @Field(() => String)
  @Property()
  type!: string;
}
