import { Resolver } from "type-graphql";

import { Project, ProjectModel } from "@entities/Project";
import { createBaseDeleteResolver } from "@resolvers/base/BaseDeleteResolver";
import { createBaseGetResolver } from "@resolvers/base/BaseGetResolver";
import { Role } from "@utils/types";
import { PROJECT_KEYS_TO_POPULATE } from "./constants";
import { createBaseQueryResolver } from "@resolvers/base/BaseQueryResolver";
import { BaseQueryInput } from "@resolvers/base/base-input/BaseQueryInput";
import { PaginatedProjectResponse } from "./pagination/PaginatedProjectResponse";

const BaseGetProjectResolver = createBaseGetResolver(
  "Project",
  Project,
  ProjectModel,
  undefined,
  PROJECT_KEYS_TO_POPULATE
);

const BaseQueryProjectResolver = createBaseQueryResolver(
  "Projects",
  PaginatedProjectResponse,
  BaseQueryInput,
  ProjectModel,
  Project,
  undefined,
  PROJECT_KEYS_TO_POPULATE,
  "order"
);

const BaseDeleteProjectResolver = createBaseDeleteResolver(
  "Project",
  Project,
  ProjectModel,
  [Role.ADMINISTRATOR],
  PROJECT_KEYS_TO_POPULATE
);

@Resolver()
export class GetProjectResolver extends BaseGetProjectResolver {}

@Resolver()
export class DeleteProjectResolver extends BaseDeleteProjectResolver {}

@Resolver()
export class QueryProjectsResolver extends BaseQueryProjectResolver {}
