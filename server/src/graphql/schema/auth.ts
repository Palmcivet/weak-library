import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { AuthType } from "@/graphql/types/auth";
import { EResponseCode, ResponseType } from "@/graphql/types/status";
import { sqlPool } from "@/utils/config";
import { hasElements } from "@/utils";

@Resolver(AuthType)
export class AuthResolver {
	@Query(() => ResponseType)
	async login(
		@Arg("identify", () => String) identity: string,
		@Arg("password", () => String) password: string
	): Promise<ResponseType> {
		let res = await sqlPool.query(
			`SELECT * FROM tb_user WHERE userId = ${identity} AND userPwd = ${password}`
		);
		if (res instanceof Error) {
			return {
				code: EResponseCode.ERROR,
				msg: "服务器错误",
			};
		}

		if (hasElements(res.recordset)) {
			return {
				code: EResponseCode.SUCCESS,
				// TODO 返回用户信息
				msg: JSON.stringify(res.recordset),
			};
		} else {
			return {
				code: EResponseCode.FAIL,
				msg: "账号或密码错误，登陆失败",
			};
		}
	}

	@Query(() => ResponseType)
	logout(): ResponseType {
		return {
			code: EResponseCode.SUCCESS,
			msg: "成功退出",
		};
	}

	@Mutation(() => ResponseType)
	createAccount() {}

	@Mutation(() => ResponseType)
	resetPassword() {}
}
