import { Context, Next } from "koa";

import { ECode } from "@/typings";

export const tryCatch = async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			code: ECode.SERVER_ERROR,
			msg: err.msg,
			data: null,
		};
	}
};
