import {
  Arg,
  Authorized,
  ClassType,
  ID,
  Mutation,
  Resolver,
} from "type-graphql";
import { Model } from "mongoose";
import { Role } from "@utils/types";

export function createBaseUpdateResolver<
  I,
  T extends ClassType,
  X extends ClassType<I>,
  E
>(
  suffix: string,
  returnType: T,
  inputType: X,
  model: Model<E>,
  roles?: Role[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseUpdateResolver {
    @Authorized(roles)
    @Mutation(() => returnType, { name: `update${suffix}` })
    async update(
      @Arg("data", () => inputType) data: Partial<I>,
      @Arg("id", () => ID) id: string
    ) {
      const result = await model.findOneAndUpdate(
        {
          id,
        },
        {
          ...data,
        },
        {
          new: true,
        }
      );

      return result;
    }
  }

  return BaseUpdateResolver;
}
