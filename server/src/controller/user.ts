/**
 * @file 登录鉴权，面向所有用户
 */

import { Context } from "koa";

import { sqlPool } from "@/utils/database";
import { genRes, getFmtDate, hasElements } from "@/utils";
import { ECode } from "@/typings";

export const UserController = {
	login: async (ctx: Context) => {
		const { id, pass } = ctx.request.body;

		try {
			let result = await sqlPool.query(
				"SELECT * FROM user_info WHERE id = (?) AND password = (?)",
				[id, pass]
			);
			// TODO 返回用户信息
			if (hasElements(result)) {
				ctx.response.body = genRes(
					ECode.SUCCESS,
					"登陆成功",
					JSON.stringify(result)
				);
			} else {
				ctx.response.body = genRes(ECode.SERVER_ERROR, "账号或密码错误");
			}
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	logout: (ctx: Context) => {
		ctx.body = genRes(ECode.SUCCESS, "退出成功");
	},

	register: async (ctx: Context) => {
		const { id, name, pass, sex, role, tel, email } = ctx.request.body;

		try {
			await sqlPool.query(
				"INSERT INTO user_info VALUES ((?) (?) (?) (?) (?) (?) (?) (?))",
				[id, name, sex, role, pass, getFmtDate(), tel, email]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "创建成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	profile: async (ctx: Context) => {
		const { id } = ctx.request.body;
		try {
			const res = await sqlPool.query("SELECT * FROM user_info WHERE id = (?)", [
				id,
			]);
			// TODO 返回用户信息
			ctx.response.body = genRes(ECode.SUCCESS, "获取信息成功", res);
		} catch (error) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "查询失败");
		}
	},

	reset: (ctx: Context) => {},

	delete: async (ctx: Context) => {
		const { id } = ctx.request.body;
		try {
			await sqlPool.query("DELETE * FROM user_info WHERE id = (?)", [id]);
			ctx.response.body = genRes(ECode.SUCCESS, "注销成功");
		} catch (err) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "注销失败");
		}
	},
};
