import { Tag } from "@entities/Tag";
import { PaginatedResponse } from "@resolvers/pagination/PaginationResponse";
import { ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedTagResponse extends PaginatedResponse(Tag) {}
