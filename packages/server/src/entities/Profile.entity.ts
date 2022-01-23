import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Allowance } from "./Allowance.entity";
import { BaseEntity } from "./Base.entity";
import { User } from "./User.entity";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => String)
  @Property({ type: "text" })
  name!: string;

  @Field(() => String)
  @Property({ type: "date" })
  birthdate!: Date;

  @Field(() => String)
  @Property({ type: "text" })
  avatar!: string;

  @Field(() => String)
  @Property({ type: "text" })
  color!: string;

  @Field(() => String)
  @Property({ type: "text" })
  mediaUri: string;

  @Field(() => String)
  @Property({ type: "text" })
  themePref!: string;

  @Field(() => Int)
  @Property()
  balance!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field(() => Allowance)
  @OneToMany(() => Allowance, (allowance) => allowance.profile)
  allowances = new Collection<Allowance>(this);
}
