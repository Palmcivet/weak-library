import { Mutation, Query, Resolver } from "type-graphql";

import { UserType } from "@/graphql/types/user";

@Resolver(UserType)
export class UserResolver {
	@Query(() => Boolean)
	getUserInfo() {}

	@Query(() => Boolean)
	getAllUser() {}

	@Mutation(() => Boolean)
	modifyInfo() {}

	@Mutation(() => Boolean)
	deleteAccount() {}
}
