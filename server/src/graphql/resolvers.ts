import { connectServer } from "@/utils/mssql";

connectServer();

export const resolvers = {
	Query: {
		hello: () => "Hello world!",
	},
};
