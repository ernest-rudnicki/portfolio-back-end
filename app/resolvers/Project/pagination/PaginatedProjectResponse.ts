import { Project } from "@entities/Project";
import { PaginatedResponse } from "@resolvers/base/pagination/PaginationResponse";
import { ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedProjectResponse extends PaginatedResponse(Project) {}
