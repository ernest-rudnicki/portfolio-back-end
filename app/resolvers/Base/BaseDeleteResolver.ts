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

export function createBaseDeleteResolver<T extends ClassType, E>(
  suffix: string,
  returnType: T,
  model: Model<E>,
  roles?: Role[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseDeleteResolver {
    @Authorized(roles)
    @Mutation(() => returnType, { name: `delete${suffix}` })
    async delete(@Arg("id", () => ID) id: string) {
      const result = await model.findByIdAndRemove(id);

      return result;
    }
  }

  return BaseDeleteResolver;
}
