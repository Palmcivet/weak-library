import { Context } from "koa";

import { EResCode, BORROWED_LIMIT, BORROWED_TIME, genRes } from "@/utils";
import { sqlPool } from "@/utils/database";
import { getFmtDate } from "@/../../common.js";

export const ProcedureController = {
	borrow: async (ctx: Context) => {
		const { book, user } = ctx.request.body;

		try {
			let check;

			// 检查是否已被借阅
			check = await sqlPool.query(
				`
SELECT
	record_key \`key\`,
	book_id \`index\`,
	book_info.\`name\` \`name\`,
	borrow_date \`date\`
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	book_id = ?
	AND borrow_time = -1`,
				[book]
			);

			if (check.length > 0) {
				ctx.response.body = genRes(
					EResCode.BOOK_BORROW_DOUBLE,
					"该图书已被借阅",
					check
				);
				return;
			}

			// 检查是否超期
			check = await sqlPool.query(
				`
SELECT
	book_id \`key\`,
	book_info.indexes \`index\`,
	book_info.\`name\` \`name\`,
	borrow_date \`date\`
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = ?
	AND borrow_time = -1
	AND borrow_time + ${BORROWED_TIME + 1} < CURRENT_DATE()`,
				[user]
			);

			if (check.length > 0) {
				ctx.response.body = genRes(
					EResCode.BOOK_BORROW_EXCEED,
					"有超期图书",
					check
				);
				return;
			}

			// 检查数量超限
			check = await sqlPool.query(
				`
SELECT
	record_key \`key\`,
	book_id \`index\`,
	book_info.\`name\` \`name\`,
	borrow_date \`date\`
FROM
	borrow_record
	INNER JOIN book_info ON book_info.bar_code = borrow_record.book_id
WHERE
	user_id = ?
	AND borrow_time = -1`,
				[user]
			);

			if (check.length > BORROWED_LIMIT) {
				ctx.response.body = genRes(
					EResCode.BOOK_BORROW_LIMIT,
					"已达借书上限",
					check
				);
				return;
			}

			await sqlPool.query(
				"INSERT INTO borrow_record (user_id, book_id, borrow_date) VALUES (?, ?, ?)",
				[user, book, getFmtDate(new Date())]
			);
			ctx.response.body = genRes(EResCode.SUCCESS, "借书成功");
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "借书失败");
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
				ctx.response.body = genRes(EResCode.SUCCESS, "还书成功");
			} else {
				ctx.response.body = genRes(
					EResCode.BOOK_RETURN_UNLENT,
					"图书未借阅",
					check
				);
			}
		} catch (error) {
			ctx.response.body = genRes(EResCode.DATABASE_FAIL, "还书失败");
		}
	},
};
