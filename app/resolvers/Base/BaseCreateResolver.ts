import { Arg, Authorized, ClassType, Mutation, Resolver } from "type-graphql";
import { Model } from "mongoose";
import { Role } from "@utils/types";

export function createBaseCreateResolver<
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
  abstract class BaseCreateResolver {
    @Authorized(roles)
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("data", () => inputType) data: I) {
      const result = await model.create(data);

      return result;
    }
  }

  return BaseCreateResolver;
}
