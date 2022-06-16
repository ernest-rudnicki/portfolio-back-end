/* eslint-disable @typescript-eslint/ban-types */
import { Arg, Authorized, ClassType, Query, Resolver } from "type-graphql";
import { Model } from "mongoose";
import { generateFilterType } from "type-graphql-filter";

import { BaseQueryInput } from "./base-input/BaseQueryInput";
import { Filters, Role } from "@utils/types";
import { populateQuery } from "./helpers";
import { generateConditions } from "@utils/utils";

export function createBaseQueryResolver<
  I extends BaseQueryInput,
  T extends ClassType,
  X extends ClassType<I>,
  M extends Model<any>,
  E
>(
  suffix: string,
  returnType: T,
  inputType: X,
  model: M,
  entity: E,
  roles?: Role[],
  keysToPopulate?: Array<keyof E>
) {
  @Resolver({ isAbstract: true })
  abstract class BaseQueryResolver {
    @Authorized(roles)
    @Query(() => returnType, { name: `query${suffix}` })
    async queryAll(
      @Arg("pagination", () => inputType) { limit, skip }: I,
      @Arg("filters", generateFilterType(entity as unknown as Function), {
        nullable: true,
      })
      filters: Filters
    ) {
      const conditions = generateConditions(filters);
      let query = model.find(conditions).skip(skip).limit(limit);
      query = populateQuery(query, keysToPopulate);

      const result = await query.exec();
      const count = await model.countDocuments(conditions);

      return {
        result,
        count,
      };
    }
  }

  return BaseQueryResolver;
}
