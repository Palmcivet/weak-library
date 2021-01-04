import { Context, Next } from "koa";

import { EResCode } from "@/utils";

export const tryCatch = async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = {
			code: EResCode.SERVER_FAtal,
			msg: err.msg || "内部系统错误",
			data: null,
		};
	}
};
