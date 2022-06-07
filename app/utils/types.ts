import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { registerEnumType } from "type-graphql";

export type Ref<T> = T | ObjectId;
export type AnyObject = Record<string, unknown>;

export interface ApiContext {
  req: Request;
  res: Response;
}

export const enum EnvironmentType {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}

export enum Role {
  NONE,
  ADMINISTRATOR,
  USER,
}

registerEnumType(Role, {
  name: "Role",
  description: "Roles in the application",
});
