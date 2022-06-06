import { EnvironmentType } from "@constants/constants";
import { logger } from "@logger/Logger";
import { LoggerPlugin } from "@plugins/LoggerPlugin";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

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
