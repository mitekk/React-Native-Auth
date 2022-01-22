import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";
import { Profile } from "./Profile.entity";

@ObjectType()
@Entity()
export class Event extends BaseEntity {
  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  @Field(() => Int)
  @Property()
  amount!: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile)
  profile!: Profile;
}
