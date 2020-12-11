import { ApolloServer } from "apollo-server-koa";

import { resolvers } from "./resolvers";
import { typeDefs } from "./types";

export const server = new ApolloServer({ typeDefs, resolvers });
