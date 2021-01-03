import { Context } from "koa";

import { ECode } from "@/typings";
import { BORROWED_LIMIT, BORROWED_TIME, genRes, getFmtDate } from "@/utils";
import { sqlPool } from "@/utils/database";

export const ProcedureController = {
	borrow: async (ctx: Context) => {
		const { book, user } = ctx.request.body;

		try {
			let check;

			// 检查数量超限
			check = await sqlPool.query(
				"SELECT * FROM borrow_record WHERE user_id = ? AND borrow_time = -1",
				[book]
			);

			if (check.length > BORROWED_LIMIT) {
				ctx.response.body = genRes(ECode.SERVER_ERROR, "已到达借书上限", check);
				return;
			}

			// 检查是否超期
			check = await sqlPool.query(
				`SELECT * FROM borrow_record WHERE user_id = ? AND borrow_time = -1 AND borrow_time + ${
					BORROWED_TIME + 1
				} < CURRENT_DATE()`,
				[book]
			);

			if (check.length > 0) {
				ctx.response.body = genRes(ECode.SERVER_ERROR, "有超期图书", check);
				return;
			}

			await sqlPool.query(
				"INSERT INTO borrow_record (user_id, book_id, borrow_date) VALUES (?, ?, ?)",
				[user, book, getFmtDate(new Date())]
			);
			ctx.response.body = genRes(ECode.SUCCESS, "借书成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	return: async (ctx: Context) => {
		const { user, book } = ctx.request.body;

		try {
			const check = await sqlPool.query(
				`
SELECT
	record_key,
	( TIMESTAMPDIFF( DAY, borrow_date, CURRENT_DATE ()) ) AS due
FROM
	borrow_record
WHERE
	user_id = ?
	AND book_id = ?
	AND borrow_time = -1`,
				[user, book]
			);

			if (check.length == 1) {
				await sqlPool.query(
					"UPDATE borrow_record SET borrow_time = ? WHERE record_key = ?",
					[check[0].due, check[0].record_key]
				);
				ctx.response.body = genRes(ECode.SUCCESS, "还书成功");
			} else {
				ctx.response.body = genRes(ECode.SERVER_ERROR, "图书未借阅");
			}
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_FAIL, "数据库处理错误");
		}
	},
};
