import { ClassType, Field, Int, ObjectType } from "type-graphql";

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    result: TItem[];

    @Field(() => Int)
    count: number;
  }

  return PaginatedResponseClass;
}
