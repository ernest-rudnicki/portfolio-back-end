import { Arg, Authorized, ClassType, Query, Resolver } from "type-graphql";
import { BaseQueryInput } from "./base-input/BaseQueryInput";
import { Model } from "mongoose";
import { Role } from "@utils/types";

export function createBaseQueryResolver<
  I extends BaseQueryInput,
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
  abstract class BaseResolver {
    @Authorized(roles)
    @Query(() => returnType, { name: `query${suffix}` })
    async queryAll(@Arg("pagination", () => inputType) { limit, skip }: I) {
      const result = await model.find().skip(skip).limit(limit).exec();
      const count = await model.countDocuments();

      return {
        result,
        count,
      };
    }
  }

  return BaseResolver;
}
