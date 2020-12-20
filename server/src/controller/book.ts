/**
 * @file 借书手续
 */

import { Context } from "koa";

export const BookController = {
	register: async (ctx: Context) => {
		const { id, name } = ctx.request.body;
	},
};
