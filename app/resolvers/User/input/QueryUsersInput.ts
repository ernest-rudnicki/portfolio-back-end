import { Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class QueryUsersInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  @Min(0)
  skip: number;
}
