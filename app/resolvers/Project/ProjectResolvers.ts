import { Resolver } from "type-graphql";

import { Project, ProjectModel } from "@entities/Project";
import { createBaseDeleteResolver } from "@resolvers/base/BaseDeleteResolver";
import { createBaseGetResolver } from "@resolvers/base/BaseGetResolver";
import { Role } from "@utils/types";

const BaseGetProjectResolver = createBaseGetResolver(
  "Project",
  Project,
  ProjectModel,
  undefined,
  ["description", "tags"]
);

const BaseDeleteProjectResolver = createBaseDeleteResolver(
  "Project",
  Project,
  ProjectModel,
  [Role.ANY],
  ["description", "tags"]
);

@Resolver()
export class GetProjectResolver extends BaseGetProjectResolver {}

@Resolver()
export class DeleteProjectResolver extends BaseDeleteProjectResolver {}
