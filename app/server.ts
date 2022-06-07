import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";

import "module-alias/register";
import "reflect-metadata";
import "dotenv/config";

import { RegisterResolver } from "@resolvers/User/RegisterResolver";
import { LoginResolver } from "@resolvers/User/LoginResolver";
import { QueryUsersResolver } from "@resolvers/User/QueryUsersResolver";
import { buildConnectionString } from "@utils/utils";
import { ApiContext } from "@utils/types";
import { authChecker } from "@auth/auth";
import { getApolloConfig } from "@config/config";
import { logger } from "@logger/Logger";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, QueryUsersResolver],
    emitSchemaFile: true,
    authChecker,
  });

  const mongoose = await connect(
    buildConnectionString(
      process.env.MONGODB_USERNAME,
      process.env.MONGODB_PASSWORD,
      process.env.MONGODB_CONNECTION_STRING
    )
  );
  await mongoose.connection;

  const server = new ApolloServer({
    ...getApolloConfig(process.env.NODE_ENV),
    schema,
    context: ({ req, res }: ApiContext) => ({ req, res }),
  });

  const app = Express();
  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: process.env.DEFAULT_PORT }, () =>
    logger.info(
      `🚀 Server ready and listening at ==> http://localhost:${process.env.DEFAULT_PORT}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  logger.error("Error during app initialization", error);
});
