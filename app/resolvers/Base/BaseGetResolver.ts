import { Arg, Authorized, ClassType, ID, Query, Resolver } from "type-graphql";
import { Model } from "mongoose";
import { Role } from "@utils/types";

export function createBaseGetResolver<T extends ClassType, E>(
  suffix: string,
  returnType: T,
  model: Model<E>,
  roles?: Role[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseGetResolver {
    @Authorized(roles)
    @Query(() => returnType, { name: `get${suffix}` })
    async get(@Arg("id", () => ID) id: string) {
      const result = await model.findById(id);

      return result;
    }
  }

  return BaseGetResolver;
}
