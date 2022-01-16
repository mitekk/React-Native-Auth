import { Entity, Enum, Property } from "@mikro-orm/core";
import { Theme } from "../enums/theme.enum";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./Base.entity";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => String)
  @Property({ type: "text" })
  nickname!: string;

  @Field(() => String)
  @Property({ type: "text" })
  avatar: string;

  @Field(() => String)
  @Property({ type: "date" })
  birthdate!: Date;

  @Field(() => String)
  @Property({ type: "text" })
  color!: string;

  @Field(() => String)
  @Enum(() => Theme)
  theme!: Theme;
}
