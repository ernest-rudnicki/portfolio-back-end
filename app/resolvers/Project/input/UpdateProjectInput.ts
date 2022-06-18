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
export class UpdateProjectTranslationInput
  implements Partial<ProjectTranslations>
{
  @Field({ nullable: true })
  @IsString()
  en: string;

  @Field({ nullable: true })
  @IsString()
  pl: string;
}

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  @Length(1, 60)
  name: string;

  @Field({ nullable: true })
  @IsInt()
  @Min(1)
  order: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  imageUrls: string[];

  @Field(() => UpdateProjectTranslationInput, { nullable: true })
  @ValidateNested()
  description: ProjectTranslations;

  @Field(() => [String], { nullable: true })
  @IsArray()
  tags: string[];
}
