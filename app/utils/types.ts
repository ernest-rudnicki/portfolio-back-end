import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { registerEnumType } from "type-graphql";
import { FilterOperator } from "type-graphql-filter";

export type Ref<T> = T | ObjectId;
export type AnyObject = Record<string, unknown>;

export interface ApiContext {
  req: Request;
  res: Response;
}

export type Filters = {
  [key in FilterOperator]: string | number;
};

export const enum EnvironmentType {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}

export enum Role {
  NONE,
  ANY,
  ADMINISTRATOR,
  USER,
}

registerEnumType(Role, {
  name: "Role",
  description: "Roles in the application",
});
