import { Arg, Authorized, ClassType, ID, Query, Resolver } from "type-graphql";
import { Model } from "mongoose";
import { Role } from "@utils/types";
import { populateQuery } from "./helpers";

export function createBaseGetResolver<T extends ClassType, E>(
  suffix: string,
  returnType: T,
  model: Model<E>,
  roles?: Role[],
  keysToPopulate?: string[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseGetResolver {
    @Authorized(roles)
    @Query(() => returnType, { name: `get${suffix}` })
    async get(@Arg("id", () => ID) id: string) {
      let query = model.findById(id);
      query = populateQuery(query, keysToPopulate);

      const result = await query.exec();

      if (!result) {
        throw Error(`There is no ${suffix.toLowerCase} with such id`);
      }

      return result;
    }
  }

  return BaseGetResolver;
}
