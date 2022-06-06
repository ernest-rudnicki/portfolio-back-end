import { Logger } from "winston";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

import { GraphQLRequestContext, WithRequired } from "apollo-server-types";
import { GraphQLRequestListener } from "apollo-server-plugin-base/src/index";
import { ApiContext } from "@utils/types";
import { USER_ID_COOKIE_NAME } from "@constants/constants";
import { GraphQLError } from "graphql";

export class LoggerPlugin implements ApolloServerPlugin {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async requestDidStart(): Promise<GraphQLRequestListener<ApiContext>> {
    const start = Date.now();
    const logger = this.logger;
    let op: string | null | undefined;
    let errors: readonly GraphQLError[];

    return {
      async didResolveOperation(
        graphqlContext: GraphQLRequestContext<ApiContext>
      ) {
        op = graphqlContext.operationName;
      },
      async didEncounterErrors(
        graphqlContext: WithRequired<
          GraphQLRequestContext<ApiContext>,
          "errors"
        >
      ) {
        errors = graphqlContext.errors;
      },
      async willSendResponse(
        graphqlContext: GraphQLRequestContext<ApiContext>
      ) {
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(graphqlContext.response).length * 2;
        const userId =
          graphqlContext.context.req.signedCookies[USER_ID_COOKIE_NAME];
        const { remoteAddress } = graphqlContext.context.req.socket;

        const log = `Request ended: operation=${op} duration=${elapsed}ms bytes=${size} userId=${
          userId ?? "unlogged"
        } remoteAddress=${remoteAddress}
        `;

        if (errors) {
          logger.error(log, `errors=${errors}`);
          return;
        }

        logger.info(log);
      },
    };
  }
}
