import { Field, ID, Int, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { ProjectTranslations } from "./ProjectTranslations";
import { Tag } from "./Tag";

@ObjectType()
export class Project {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ default: new Date() })
  creationDate: Date;

  @Field(() => Int)
  @Property({ required: true })
  order: number;

  @Field(() => [String])
  @Property()
  imageUrls: string[];

  @Field(() => ProjectTranslations)
  @Property({ ref: () => ProjectTranslations, required: true })
  description: Ref<ProjectTranslations>;

  @Field(() => [Tag])
  @Property({ ref: () => Tag, required: true })
  tags: Ref<Tag>[];
}

export const ProjectModel = getModelForClass(Project);
