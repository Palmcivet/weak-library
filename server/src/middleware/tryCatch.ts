import { ECode } from "@/typings";
import { Context, Next } from "koa";

export const tryCatch = async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			code: ECode.FAIL,
			msg: err.msg,
			data: null,
		};
	}
};
