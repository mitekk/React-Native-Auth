import {
  Entity,
  OneToMany,
  Property,
  BeforeCreate,
  Collection,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import argon2 from "argon2";
import { BaseEntity } from "./Base.entity";
import { Profile } from "./Profile.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  password!: string;

  @Field(() => Profile)
  @OneToMany(() => Profile, (profile) => profile.user)
  profiles = new Collection<Profile>(this);

  @BeforeCreate()
  async hashPasswordBeforeInsert() {
    this.password = await argon2.hash(this.password);
  }
}
