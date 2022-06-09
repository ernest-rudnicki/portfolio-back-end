import { Role } from "@utils/types";
import { Resolver } from "type-graphql";

import { User, UserModel } from "@entities/User";
import { PaginatedUserResponse } from "./factories/PaginatedUserResponse";
import { BaseQueryInput } from "@resolvers/base/base-input/BaseQueryInput";
import { UpdateUserInput } from "./input/UpdateInput";

import { createBaseQueryResolver } from "@resolvers/base/BaseQueryResolver";
import { createBaseDeleteResolver } from "@resolvers/base/BaseDeleteResolver";
import { createBaseUpdateResolver } from "@resolvers/base/BaseUpdateResolver";

const BaseQueryUsersResolver = createBaseQueryResolver(
  "Users",
  PaginatedUserResponse,
  BaseQueryInput,
  UserModel,
  [Role.ADMINISTRATOR]
);

const BaseUpdateUserResolver = createBaseUpdateResolver(
  "User",
  User,
  UpdateUserInput,
  UserModel,
  [Role.ADMINISTRATOR]
);

const BaseDeleteUserResolver = createBaseDeleteResolver(
  "User",
  User,
  UserModel,
  [Role.ADMINISTRATOR]
);

@Resolver()
export class QueryUsersResolver extends BaseQueryUsersResolver {}

@Resolver()
export class UpdateUserResolver extends BaseUpdateUserResolver {}

@Resolver()
export class DeleteUserResolver extends BaseDeleteUserResolver {}
