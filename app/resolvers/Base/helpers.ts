import { AnyObject } from "@utils/types";
import { Query } from "mongoose";
import { Filters } from "./types";

export function populateQuery<ResultType, DocType, E>(
  query: Query<ResultType, DocType, AnyObject, E>,
  keysToPopulate?: Array<keyof E>
) {
  if (keysToPopulate) {
    query.populate(keysToPopulate as string[]);
  }

  return query;
}

export function generateConditions<E>(filters: Filters) {
  const conditions: { [P in keyof E]?: any } = {};
  for (const [filterKey, value] of Object.entries(filters)) {
    const splitted = filterKey.split("_");
    const field = splitted[0] as keyof E;
    const operator = splitted[1];

    switch (operator) {
      case "like":
        if (typeof value !== "string") {
          throw Error("Value must be a string for like operator");
        }
        conditions[field] = new RegExp(value);
        break;
      case "likeAny":
        throw Error("likeAny filter operator is not supported");
      default:
        conditions[field] = {
          [`$${operator}`]: value,
        };
        break;
    }
  }
  return conditions;
}
