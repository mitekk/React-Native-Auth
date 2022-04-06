import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";
import { Profile } from "./Profile.entity";

@ObjectType()
@Entity()
export class Allowance extends BaseEntity {
  @Field(() => Int)
  @Property()
  amount!: number;

  @Field(() => Int)
  @Property()
  initBalance!: number;

  @Field(() => String)
  @Property()
  interval!: string;

  @Field(() => String)
  @Property()
  startFrom!: Date;

  @Field(() => Profile)
  @ManyToOne(() => Profile)
  profile!: Profile;
}
