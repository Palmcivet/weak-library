import { Context } from "koa";

import { ECode } from "@/typings";
import { genRes } from "@/utils";
import { sqlPool } from "@/utils/database";

export const BookController = {
	register: async (ctx: Context) => {
		const {
			bar_code,
			indexes,
			name,
			type,
			author,
			press,
			price,
			stock,
			borrow,
		} = ctx.request.body;

		try {
			await sqlPool.query(
				"INSERT INTO book_info VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[indexes, name, type, author, press, price]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "图书登记成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	delete: async (ctx: Context) => {
		const { bar_code } = ctx.request.body;

		try {
			await sqlPool.query("DELETE * FROM book_info WHERE bar_code = (?)", [
				bar_code,
			]);
			ctx.response.body = genRes(ECode.SUCCESS, "图书注销成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库查询错误");
		}
	},

	fetch: async (ctx: Context) => {
		const { bar_code } = ctx.request.body;

		try {
			const res = await sqlPool.query(
				"SELECT * FROM book_info WHERE bar_code = (?)",
				[bar_code]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "图书查询成功", res);
		} catch (error) {
			ctx.response.body = genRes(ECode.SUCCESS, "数据库查询错误");
		}
	},

	query: async (ctx: Context) => {
		const keyword = `${ctx.request.body.keyword}%`;

		try {
			const res = await sqlPool.query(
				`
SELECT
	book_info.bar_code \`key\`,
	book_info.indexes \`index\`,
	book_info.name \`name\`,
	book_type.type_name \`type\`,
	book_info.author \`author\`,
	book_info.press \`press\`,
	book_info.price \`price\`
FROM
	book_info
	INNER JOIN book_type ON book_info.type = book_type.type_id
WHERE
	book_info.indexes LIKE ?
	OR book_info.name LIKE ?
	OR book_info.bar_code LIKE ?`,
				[keyword, keyword, keyword]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "图书查询成功", res);
		} catch (error) {
			ctx.response.body = genRes(ECode.SUCCESS, "数据库查询错误");
		}
	},

	modify: async (ctx: Context) => {
		const {
			bar_code,
			indexes,
			name,
			type,
			author,
			press,
			price,
			stock,
			borrow,
		} = ctx.request.body;

		try {
			await sqlPool.query(
				"UPDATE book_info SET indexes = ?, name = ?, type = ?, author = ?, press = ?, price = ?, stock = ?, borrow = ? WHERE bar_code = ?",
				[indexes, name, type, author, press, price, stock, borrow, bar_code]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "图书信息更改成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},
};
