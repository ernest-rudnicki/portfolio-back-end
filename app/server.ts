import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'reflect-metadata';
import 'dotenv/config'

import { buildConnectionString } from './utils/utils';
import { UserResolver } from './resolvers/User/UserResolver';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: true,
  });

  const mongoose = await connect(buildConnectionString(
      process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.MONGODB_CONNECTION_STRING
    ));
  await mongoose.connection;

  const server = new ApolloServer({
    schema,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: process.env.DEFAULT_PORT }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});