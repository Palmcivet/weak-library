import { Mutation, Query, Resolver } from "type-graphql";

import { UserType } from "@/graphql/types/user";

@Resolver(UserType)
export class UserResolver {
	@Query((returns) => Boolean)
	getUserInfo() {}

	@Query((returns) => Boolean)
	getAllUser() {}

	@Mutation()
	modifyInfo() {}

	@Mutation()
	deleteAccount() {}
}
