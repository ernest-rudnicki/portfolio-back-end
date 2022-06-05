import { ObjectType, Field, ID, Root } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Role } from "@utils/types";

@ObjectType({ description: "The User model" })
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Property({ required: true })
  firstName: string;

  @Property({ required: true })
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Property({ default: new Date() })
  creationDate: Date;

  @Property({ required: true })
  password: string;

  @Field()
  @Property({ default: Role.USER })
  role: Role;
}

export const UserModel = getModelForClass(User);
