import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

//load schema & resolvers
import typeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
//load db
import database from "./config/database/index.js";
//load db method
import * as mongoDataMethods from "./controllers/index.js";

//connect to mongoDB
database();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ ...mongoDataMethods }),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => {
  console.log(`Server ready at http://localhost:8080${server.graphqlPath}`);
});
