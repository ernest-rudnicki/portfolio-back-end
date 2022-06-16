import { Resolver } from "type-graphql";

import { Tag, TagModel } from "@entities/Tag";
import { BaseQueryInput } from "@resolvers/base/base-input/BaseQueryInput";
import { UpdateTagInput } from "./input/UpdateTagInput";
import { createBaseCreateResolver } from "@resolvers/base/BaseCreateResolver";
import { createBaseQueryResolver } from "@resolvers/base/BaseQueryResolver";
import { CreateTagInput } from "./input/CreateTagInput";
import { PaginatedTagResponse } from "./pagination/PaginatedTagResponse";
import { Role } from "@utils/types";
import { createBaseUpdateResolver } from "@resolvers/base/BaseUpdateResolver";
import { createBaseDeleteResolver } from "@resolvers/base/BaseDeleteResolver";
import { createBaseGetResolver } from "@resolvers/base/BaseGetResolver";

const BaseQueryTagResolver = createBaseQueryResolver(
  "Tags",
  PaginatedTagResponse,
  BaseQueryInput,
  TagModel,
  Tag
);

const BaseGetTagResolver = createBaseGetResolver("Tag", Tag, TagModel);

const BaseCreateTagResolver = createBaseCreateResolver(
  "Tag",
  Tag,
  CreateTagInput,
  TagModel,
  [Role.ADMINISTRATOR]
);

const BaseUpdateTagResolver = createBaseUpdateResolver(
  "Tag",
  Tag,
  UpdateTagInput,
  TagModel,
  [Role.ADMINISTRATOR]
);

const BaseDeleteTagResolver = createBaseDeleteResolver("Tag", Tag, TagModel, [
  Role.ADMINISTRATOR,
]);

@Resolver()
export class QueryTagsResolver extends BaseQueryTagResolver {}

@Resolver()
export class CreateTagResolver extends BaseCreateTagResolver {}

@Resolver()
export class UpdateTagResolver extends BaseUpdateTagResolver {}

@Resolver()
export class DeleteTagResolver extends BaseDeleteTagResolver {}

@Resolver()
export class GetTagResolver extends BaseGetTagResolver {}
