import { Context } from "koa";

import { sqlPool } from "@/utils/database";
import { hasElements } from "@/utils";
import { EResponseCode } from "@/typings";

export const login = async (ctx: Context) => {
	const { id, password } = ctx.request.body;

	let result = await sqlPool.query(
		"SELECT * FROM user_info WHERE id = (?) AND password = (?)",
		[id, password]
	);

	if (result instanceof Error) {
		ctx.response.body = {
			code: EResponseCode.ERROR,
			msg: "服务器错误",
		};
	}

	if (hasElements(result)) {
		ctx.response.body = {
			code: EResponseCode.SUCCESS,
			// TODO 返回用户信息
			msg: JSON.stringify(result),
		};
	} else {
		ctx.response.body = {
			code: EResponseCode.FAIL,
			msg: "账号或密码错误，登陆失败",
		};
	}
};

export const logout = (ctx: Context) => {
	ctx.body = {
		code: EResponseCode.SUCCESS,
		msg: "成功退出",
	};
};

export const createAccount = () => {};

export const resetPassword = () => {};
