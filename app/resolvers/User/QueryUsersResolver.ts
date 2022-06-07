import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { UserModel } from "@entities/User";
import { Role } from "@utils/types";
import { QueryUsersInput } from "./input/QueryUsersInput";
import { PaginatedUserResponse } from "./factories/PaginatedUser";

@Resolver()
export class QueryUsersResolver {
  @Authorized([Role.ADMINISTRATOR])
  @Query(() => PaginatedUserResponse)
  async queryUsers(@Arg("pagination") { limit, skip }: QueryUsersInput) {
    const result = await UserModel.find().skip(skip).limit(limit).exec();
    const count = await UserModel.countDocuments();

    return {
      result,
      count,
    };
  }
}
