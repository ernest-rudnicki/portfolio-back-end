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

export function createBaseDeleteResolver<T extends ClassType, E>(
  suffix: string,
  returnType: T,
  model: Model<E>,
  roles?: Role[],
  keysToPopulate?: Array<keyof E>
) {
  @Resolver({ isAbstract: true })
  abstract class BaseDeleteResolver {
    @Authorized(roles)
    @Mutation(() => returnType, { name: `delete${suffix}` })
    async delete(@Arg("id", () => ID) id: string) {
      let query = model.findByIdAndRemove(id);
      query = populateQuery(query, keysToPopulate);

      const result = await query.exec();

      return result;
    }
  }

  return BaseDeleteResolver;
}
