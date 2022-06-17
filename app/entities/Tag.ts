import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Filter } from "type-graphql-filter";

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true, unique: true })
  @Filter(["like"])
  name: string;

  @Field()
  @Property({ required: true })
  bgColor: string;

  @Field()
  @Property({ required: true })
  fontColor: string;
}

export const TagModel = getModelForClass(Tag);
