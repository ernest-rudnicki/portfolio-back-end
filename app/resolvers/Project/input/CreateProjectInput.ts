import { ProjectTranslations } from "@entities/ProjectTranslations";
import {
  IsArray,
  IsInt,
  IsString,
  Length,
  Min,
  ValidateNested,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProjectTranslationInput
  implements Partial<ProjectTranslations>
{
  @Field()
  @IsString()
  en: string;

  @Field()
  @IsString()
  pl: string;
}

@InputType()
export class CreateProjectInput {
  @Field()
  @Length(1, 60)
  name: string;

  @Field()
  @IsInt()
  @Min(1)
  order: number;

  @Field(() => [String])
  @IsArray()
  imageUrls: string[];

  @Field(() => CreateProjectTranslationInput)
  @ValidateNested()
  description: ProjectTranslations;

  @Field(() => [String])
  @IsArray()
  tags: string[];
}
