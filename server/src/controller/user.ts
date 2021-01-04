import { Context } from "koa";

import { EResCode, genRes } from "@/utils";
import { sqlPool } from "@/utils/database";
import { getFmtDate, hasElements } from "@/../../common.js";

export const UserController = {
	login: async (ctx: Context) => {
		const { id, pass } = ctx.request.body;

		try {
			let result = await sqlPool.query(
				"SELECT id, name, role FROM user_info WHERE id = ? AND password = ?",
				[id, pass]
			);

			if (hasElements(result)) {
				ctx.response.body = genRes(EResCode.SUCCESS, "登陆成功", result[0]);
			} else {
				ctx.response.body = genRes(EResCode.LOGIN_ERROR, "账号或密码错误");
			}
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "登录失败");
		}
	},

	logout: (ctx: Context) => {
		ctx.body = genRes(EResCode.SUCCESS, "退出成功");
	},

	/**
	 * 获取用户信息
	 */
	fetch: async (ctx: Context) => {
		const { id } = ctx.request.body;

		try {
			const res = await sqlPool.query(
				`
SELECT
	id,
	\`name\`,
	sex,
	role,
	register_date \`date\`,
	telephone \`tel\`,
	email
FROM
	user_info
WHERE
	id = ?`,
				[id]
			);
			ctx.response.body = genRes(EResCode.SUCCESS, "获取信息成功", res[0]);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "获取信息失败");
		}
	},

	/**
	 * 更改用户信息
	 */
	modify: async (ctx: Context) => {
		let { id, name, pass, sex, role, tel, email } = ctx.request.body;

		try {
			if (pass === true) {
				await sqlPool.query(
					"UPDATE user_info SET name = ?, sex = ?, role = ?, password = ?, telephone = ?, email = ? WHERE id = ?",
					[name, sex, role, id, tel, email, id]
				);
			} else {
				await sqlPool.query(
					"UPDATE user_info SET name = ?, sex = ?, role = ?, telephone = ?, email = ? WHERE id = ?",
					[name, sex, role, tel, email, id]
				);
			}

			ctx.response.body = genRes(EResCode.SUCCESS, "用户信息更改成功");
		} catch (error) {
			console.log(error);
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "用户信息更改失败");
		}
	},

	delete: async (ctx: Context) => {
		const { id } = ctx.request.body;

		try {
			await sqlPool.query("DELETE FROM user_info WHERE id = ?", [id]);
			ctx.response.body = genRes(EResCode.SUCCESS, "注销成功");
		} catch (err) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "注销失败");
		}
	},

	register: async (ctx: Context) => {
		const { id, name, sex, role, tel, email } = ctx.request.body;

		try {
			await sqlPool.query("INSERT INTO user_info VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
				id,
				name,
				sex,
				role,
				id,
				getFmtDate(new Date()),
				tel,
				email,
			]);

			ctx.response.body = genRes(EResCode.SUCCESS, "新用户注册成功");
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "新用户注册失败");
		}
	},

	/**
	 * 获取当前借阅
	 */
	status: async (ctx: Context) => {
		const { id } = ctx.request.body;

		try {
			const res = await sqlPool.query(
				`
SELECT
	borrow_record.borrow_date as \`date\`,
	book_info.name,
	book_info.bar_code as \`key\`,
	book_info.indexes as \`index\`
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = ?
	AND borrow_time = - 1`,
				[id]
			);

			ctx.response.body = genRes(EResCode.SUCCESS, "当前借阅信息获取成功", res);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "当前借阅信息获取失败");
		}
	},

	/**
	 * 获取借书记录
	 */
	record: async (ctx: Context) => {
		const { id } = ctx.request.body;

		try {
			const res = await sqlPool.query(
				`
SELECT
	book_info.bar_code as \`key\`,
	borrow_record.borrow_date as \`date\`,
	book_info.name,
	book_info.indexes as \`index\`
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = ?`,
				[id]
			);

			ctx.response.body = genRes(EResCode.SUCCESS, "历史借阅信息获取成功", res);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "历史借阅信息获取失败");
		}
	},
};
