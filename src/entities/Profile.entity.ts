import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./Base.entity";

@Entity()
export class Profile extends BaseEntity {
  @Property({ type: "text" })
  title!: string;
}
