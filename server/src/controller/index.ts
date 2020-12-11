import { Context, Next } from "koa";

export const test = async (ctx: Context, next: Next) => {
	const start = Date.now();
	await next();
};

