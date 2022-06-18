import { Unique } from "@custom-validators/Unique";
import { Tag, TagModel } from "@entities/Tag";
import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateTagInput implements Partial<Tag> {
  @Field({ nullable: true })
  @Length(1, 30)
  @Unique(TagModel)
  name: string;

  @Field({ nullable: true })
  bgColor: string;

  @Field({ nullable: true })
  fontColor: string;
}
