import { Context, Next } from "koa";

export const setCors = async (ctx: Context, next: Next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
	ctx.set("Access-Control-Allow-Headers", "accept, origin, content-type");
	ctx.set("Access-Control-Allow-Credentials", "true");
	ctx.set("Content-Type", "application/json; charset=utf-8");

	if (ctx.method === "OPTIONS") {
		ctx.status = 204;
		ctx.body = "";
		return;
	}

	await next();
};
