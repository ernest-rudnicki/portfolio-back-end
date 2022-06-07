import { Field, ID } from "type-graphql";

export class Project {
  @Field(() => ID)
  id: number;
}
