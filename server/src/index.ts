import Koa from "koa";
import { ApolloServer, gql } from "apollo-server-koa";
import { link } from "./database";

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello world!",
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
link();

app.use(async (ctx) => {
	ctx.body = "Hello";
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
