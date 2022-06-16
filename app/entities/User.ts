/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

import { Role } from "@utils/types";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true, unique: true })
  @Filter(["eq"])
  email: string;

  @Field()
  @Property({ required: true })
  firstName: string;

  @Field()
  @Property({ required: true })
  lastName: string;

  @Field()
  @Property({ default: new Date() })
  creationDate: Date;

  @Property({ required: true })
  password: string;

  @Field(() => Role)
  @Property({ default: Role.USER })
  role: Role;
}

export const UserModel = getModelForClass(User);
