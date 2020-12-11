import koa from "koa";
import bodyParser from "koa-bodyparser";

import { server } from "@/graphql/index";
import { logger } from "@/utils/logger";
import { routers } from "@/router/index";
import { getConfig } from "@/utils/config";

const config = getConfig();

const app = new koa();

app.use(bodyParser({ enableTypes: ["json", "text"] }));

app.use(routers.routes());

app.on("error", (err, ctx) => {
	logger.error("server error: ", err, ctx);
});

server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
	logger.info(`🚀 Server ready at ${config.address}:${config.port}`)
);

process.on("uncaughtException", (err) => {
	logger.error("子进程内部错误：", err);
	process.exit(1);
});
