import { AnyObject } from "@utils/types";
import { Query } from "mongoose";

export function populateQuery<ResultType, DocType, E>(
  query: Query<ResultType, DocType, AnyObject, E>,
  keysToPopulate?: Array<keyof E>
) {
  if (keysToPopulate) {
    query.populate(keysToPopulate as string[]);
  }

  return query;
}
