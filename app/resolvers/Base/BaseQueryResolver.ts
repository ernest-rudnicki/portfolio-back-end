import { Arg, Authorized, ClassType, Query, Resolver } from "type-graphql";
import { BaseQueryInput } from "./base-input/BaseQueryInput";
import { Model } from "mongoose";
import { Role } from "@utils/types";
import { populateQuery } from "./helpers";

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
  roles?: Role[],
  keysToPopulate?: Array<keyof E>
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Authorized(roles)
    @Query(() => returnType, { name: `query${suffix}` })
    async queryAll(@Arg("pagination", () => inputType) { limit, skip }: I) {
      let query = model.find().skip(skip).limit(limit);
      query = populateQuery(query, keysToPopulate);

      const result = await query.exec();
      const count = await model.countDocuments();

      return {
        result,
        count,
      };
    }
  }

  return BaseResolver;
}
