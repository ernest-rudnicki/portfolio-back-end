import { Project } from "@entities/Project";

export const PROJECT_KEYS_TO_POPULATE: Array<keyof Project> = [
  "description",
  "tags",
];
