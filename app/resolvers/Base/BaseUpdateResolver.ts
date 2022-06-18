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
import { populateQuery } from "./helpers";

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
  roles?: Role[],
  keysToPopulate?: string[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseUpdateResolver {
    @Authorized(roles)
    @Mutation(() => returnType, { name: `update${suffix}` })
    async update(
      @Arg("data", () => inputType) data: Partial<I>,
      @Arg("id", () => ID) id: string
    ) {
      let query = model.findByIdAndUpdate(
        id,
        {
          ...data,
        },
        {
          new: true,
        }
      );

      query = populateQuery(query, keysToPopulate);

      const result = await query.exec();

      if (!result) {
        throw Error(`There is no ${suffix.toLowerCase()} with such id`);
      }

      return result;
    }
  }

  return BaseUpdateResolver;
}
