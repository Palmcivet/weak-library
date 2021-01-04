import { Context } from "koa";

import { genRes, EResCode } from "@/utils";
import { sqlPool } from "@/utils/database";

export const BookController = {
	fetch: async (ctx: Context) => {
		const { bar_code } = ctx.request.body;

		try {
			const res = await sqlPool.query(
				`
SELECT
	book_info.bar_code \`key\`,
	book_info.indexes \`index\`,
	book_info.name \`name\`,
	book_info.type \`type\`,
	book_info.author \`author\`,
	book_info.press \`press\`,
	book_info.price \`price\`
FROM
	book_info
WHERE
	book_info.bar_code = ?`,
				[bar_code]
			);
			ctx.response.body = genRes(EResCode.SUCCESS, "图书查询成功", res[0]);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "图书查询失败");
		}
	},

	modify: async (ctx: Context) => {
		const { key, index, name, type, author, press, price } = ctx.request.body;

		try {
			await sqlPool.query(
				"UPDATE book_info SET indexes = ?, name = ?, type = ?, author = ?, press = ?, price = ? WHERE bar_code = ?",
				[index, name, type, author, press, price, key]
			);
			ctx.response.body = genRes(EResCode.SUCCESS, "图书信息修改成功");
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "图书信息修改失败");
		}
	},

	delete: async (ctx: Context) => {
		const { key } = ctx.request.body;

		try {
			await sqlPool.query("DELETE FROM book_info WHERE bar_code = ?", [key]);
			ctx.response.body = genRes(EResCode.SUCCESS, "图书注销成功");
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "图书注销失败");
		}
	},

	register: async (ctx: Context) => {
		const { index, name, type, author, press, price } = ctx.request.body;

		try {
			await sqlPool.query(
				"INSERT INTO book_info (indexes, name, type, author, press, price) VALUES (?, ?, ?, ?, ?, ?)",
				[index, name, type, author, press, price]
			);
			ctx.response.body = genRes(EResCode.SUCCESS, "图书登记成功");
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "数据库处理错误");
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
			ctx.response.body = genRes(EResCode.SUCCESS, "图书查询成功", res);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "图书查询失败");
		}
	},

	category: async (ctx: Context) => {
		try {
			const res = await sqlPool.query("SELECT * FROM book_type");
			ctx.response.body = genRes(EResCode.SUCCESS, "图书类别查询成功", res);
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "图书类别查询失败");
		}
	},
};
