import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";

export class Token {
  @Property()
  token: string;

  @Property({ default: new Date() })
  creationDate: Date;

  @Property({ ref: () => User })
  user: Ref<User>;
}

export const TokenModel = getModelForClass(Token);
