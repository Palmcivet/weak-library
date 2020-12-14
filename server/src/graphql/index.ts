import graphqlHTTP from "koa-graphql";
import { buildSchemaSync } from "type-graphql";

import { logger } from "@/utils/logger";
import { sqlPool, isDev } from "@/utils/config";
import { AuthResolver } from "./schema/auth";
import { UserResolver } from "./schema/user";

sqlPool
	.connect()
	.then((res) => {
		logger.log("SQL Server connected");
		logger.info(res);
	})
	.catch((err) => {
		logger.error(err);
	});

const rootSchema = buildSchemaSync({
	resolvers: [AuthResolver, UserResolver],
});

const rootResolver = {
	hello: () => "Hello world!",
};

export const server = graphqlHTTP({
	schema: rootSchema,
	rootValue: rootResolver,
	graphiql: isDev,
});
