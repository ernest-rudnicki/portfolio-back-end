import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";

import "module-alias/register";
import "reflect-metadata";
import "dotenv/config";

import { RegisterResolver } from "@resolvers/User/RegisterResolver";
import { LoginResolver } from "@resolvers/User/LoginResolver";
import { buildConnectionString } from "@utils/utils";
import { ApiContext } from "@utils/types";
import { authChecker } from "@auth/auth";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
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
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: ({ req, res }: ApiContext) => ({ req, res }),
  });

  const app = Express();
  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: process.env.DEFAULT_PORT }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});
