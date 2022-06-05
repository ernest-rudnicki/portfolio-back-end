import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;
export type AnyObject = Record<string, unknown>;

export interface ApiContext {
  req: Request;
  res: Response;
}

export const enum Role {
  NONE,
  ADMINISTRATOR,
  USER,
}
