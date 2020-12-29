import { Context } from "koa";

import { ECode } from "@/typings";
import { genRes, getFmtDate, hasElements } from "@/utils";
import { sqlPool } from "@/utils/database";

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
				ctx.response.body = genRes(ECode.SUCCESS, "登陆成功", result[0]);
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
			await sqlPool.query("INSERT INTO user_info VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
				id,
				name,
				sex,
				role,
				pass,
				getFmtDate(new Date()),
				tel,
				email,
			]);

			ctx.response.body = genRes(ECode.SUCCESS, "用户注册成功");
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
			ctx.response.body = genRes(ECode.SUCCESS, "获取信息成功", res[0]);
		} catch (error) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "查询失败");
		}
	},

	status: async (ctx: Context) => {
		const { id } = ctx.request.body;
		try {
			const res = await sqlPool.query(
				`
SELECT
	borrow_record.record_key as \`key\`,
	borrow_record.borrow_date,
	book_info.name,
	book_info.indexes
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = (?)
	AND borrow_time = - 1`,
				[id]
			);

			ctx.response.body = genRes(ECode.SUCCESS, "获取信息成功", res);
		} catch (error) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "查询失败");
		}
	},

	record: async (ctx: Context) => {
		const { id } = ctx.request.body;
		try {
			const res = await sqlPool.query(
				`
SELECT
	borrow_record.record_key as \`key\`,
	borrow_record.borrow_date,
	book_info.name,
	book_info.indexes
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = (?)`,
				[id]
			);

			ctx.response.body = genRes(ECode.SUCCESS, "获取信息成功", res);
		} catch (error) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "查询失败");
		}
	},

	modify: async (ctx: Context) => {
		const { id, name, pass, sex, role, tel, email } = ctx.request.body;

		try {
			await sqlPool.query(
				"UPDATE user_info SET name = ?, sex = ?, role = ?, password = ?, telephone = ?, email = ? WHERE id = ?",
				[name, sex, role, pass, tel, email, id]
			);

			ctx.response.body = genRes(ECode.SUCCESS, "用户注册成功");
		} catch (error) {
			console.log(error);
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	reset: (ctx: Context) => {},

	delete: async (ctx: Context) => {
		const { id } = ctx.request.body;
		try {
			await sqlPool.query("DELETE FROM user_info WHERE id = (?)", [id]);
			ctx.response.body = genRes(ECode.SUCCESS, "注销成功");
		} catch (err) {
			ctx.response.body = genRes(ECode.SERVER_ERROR, "注销失败");
		}
	},
};
