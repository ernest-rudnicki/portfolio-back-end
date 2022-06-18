/* eslint-disable @typescript-eslint/ban-types */
import { Arg, Authorized, ClassType, Query, Resolver } from "type-graphql";
import { generateFilterType } from "type-graphql-filter";

import { BaseQueryInput } from "./base-input/BaseQueryInput";
import { Role } from "@utils/types";
import { generateConditions, populateQuery } from "./helpers";
import { ReturnModelType } from "@typegoose/typegoose";
import {
  AnyParamConstructor,
  BeAnObject,
} from "@typegoose/typegoose/lib/types";
import { Filters } from "./types";

export function createBaseQueryResolver<
  I extends BaseQueryInput,
  T extends ClassType,
  X extends ClassType<I>,
  E extends AnyParamConstructor<any>
>(
  suffix: string,
  returnType: T,
  inputType: X,
  model: ReturnModelType<E, BeAnObject>,
  entity: E,
  roles?: Role[],
  keysToPopulate?: string[],
  sort?: string
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
      filters: Filters = {}
    ) {
      const conditions = generateConditions(filters);
      let query = model.find(conditions).skip(skip).limit(limit).sort(sort);
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
