import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { AuthType } from "@/graphql/types/auth";
import { ResponseType } from "@/graphql/types/status";
import { sqlPool } from "@/utils/config";

@Resolver(AuthType)
export class AuthResolver {
	@Query((returns) => ResponseType)
	async login(
		@Arg("identify", (type) => String) identity: string,
		@Arg("password", (type) => String) password: string
	) {
		let res = await sqlPool.query(
			`SELECT * FROM tb_user WHERE userId = ${identity} AND userPwd = ${password}`
		);

		return res;
	}

	@Query((returns) => Boolean)
	logout() {
		return true;
	}

	@Mutation()
	createAccount() {}

	@Mutation()
	resetPassword() {}
}
