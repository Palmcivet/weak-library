import { Context, Next } from "koa";

export const setCors = async (ctx: Context, next: Next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
	ctx.set("Access-Control-Allow-Headers", "accept, origin, content-type");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Content-Type", "application/json;charset=utf-8");

	if (ctx.method === "OPTIONS") {
		ctx.body = "";
	}

	await next();
};
