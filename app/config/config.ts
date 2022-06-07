import { EnvironmentType } from "@utils/types";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { logger } from "@logger/Logger";
import { LoggerPlugin } from "@plugins/LoggerPlugin";

export function getApolloConfig(env?: string) {
  switch (env) {
    case EnvironmentType.DEVELOPMENT:
      return {
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground,
          new LoggerPlugin(logger),
        ],
      };
    default:
      return {
        plugins: [new LoggerPlugin(logger)],
      };
  }
}
