import { User } from "@entities/User";
import { PaginatedResponse } from "@pagination/pagination-response";
import { ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}
