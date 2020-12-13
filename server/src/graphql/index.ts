import graphqlHTTP from "koa-graphql";

import { resolvers } from "./resolvers";
import { schema } from "./schema";

export const server = graphqlHTTP({
	schema: schema,
	rootValue: resolvers,
	graphiql: true,
});
