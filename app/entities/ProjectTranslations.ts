import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class ProjectTranslations {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  en: string;

  @Field()
  @Property({ required: true })
  pl: string;
}

export const ProjectTranslationsModel = getModelForClass(ProjectTranslations);
