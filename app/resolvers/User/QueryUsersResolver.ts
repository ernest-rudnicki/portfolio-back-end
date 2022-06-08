import { UserModel } from "@entities/User";
import { PaginatedUserResponse } from "./factories/PaginatedUserResponse";
import { createBaseQueryResolver } from "@resolvers/Base/BaseQueryResolver";
import { BaseQueryInput } from "@resolvers/Base/BaseQueryInput";
import { Role } from "@utils/types";
import { Resolver } from "type-graphql";

const BaseQueryUsersResolver = createBaseQueryResolver(
  "Users",
  PaginatedUserResponse,
  BaseQueryInput,
  UserModel,
  [Role.ADMINISTRATOR]
);

@Resolver()
export class QueryUsersResolver extends BaseQueryUsersResolver {}
