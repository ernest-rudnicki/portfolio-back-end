import { Tag } from "@entities/Tag";
import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTagInput implements Partial<Tag> {
  @Field()
  @Length(1, 30)
  name: string;

  @Field()
  bgColor: string;

  @Field()
  fontColor: string;
}
