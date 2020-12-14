import "reflect-metadata";
import koa from "koa";
import mount from "koa-mount";

import { server } from "@/graphql";
import { logger } from "@/utils/logger";
import { getConfig } from "@/utils/config";

const config = getConfig();

const app = new koa();

app.use(mount("/graphql", server));

app.on("error", (err, ctx) => {
	logger.error("server error: ", err, ctx);
});

app.listen({ port: config.port }, () =>
	console.log(`🚀 Server ready at ${config.address}:${config.port}`)
);

process.on("uncaughtException", (err) => {
	logger.error("子进程内部错误：", err);
	process.exit(1);
});
