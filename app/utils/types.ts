import { ObjectId } from "mongodb";

export type Ref<T> = T | ObjectId;
export type AnyObject = Record<string, unknown>;
