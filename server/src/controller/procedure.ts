import { Context } from "koa";

import { ECode } from "@/typings";
import { addDate, genRes, getFmtDate } from "@/utils";
import { sqlPool } from "@/utils/database";

export const ProcedureController = {
	borrow: async (ctx: Context) => {
		const { book, id } = ctx.request.body;

		try {
			const cur = getFmtDate();
			const due = addDate(cur, 30);
			await sqlPool.query("INSERT INTO borrow_record VALUES (?, ?, ?, ?)", [
				cur,
				due,
				id,
				book,
			]);
			ctx.response.body = genRes(ECode.SUCCESS, "借书成功");
		} catch (error) {
			ctx.response.body = genRes(ECode.DATABASE_ERROR, "数据库处理错误");
		}
	},

	return: async (ctx: Context) => {},
};
