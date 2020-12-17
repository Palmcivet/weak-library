import koa from "koa";
import body from "koa-bodyparser";

import { isDev } from "@/utils";
import { logger } from "@/utils/logger";
import { sqlPool } from "@/utils/database";
import { routers } from "@/router";

class Server {
	app!: koa;
	port!: number;
	host!: string;

	constructor() {
		this.port = isDev ? 8081 : 8080;
		this.host = isDev ? "127.0.0.1" : "10.1.122.74";
		this.app = new koa();
		this.app.use(body());
		this.app.use(routers.routes());
		this.app.use(routers.allowedMethods());
	}

	private async initSql() {
		let conn;
		try {
			conn = await sqlPool.getConnection();
			logger.log("MariaDB connected");
		} catch (err) {
			logger.error(err);
		} finally {
			if (conn) {
				conn.release();
			}
		}
	}

	async launch() {
		await this.initSql();

		this.app.on("error", (err, ctx) => {
			logger.error("server error: ", err, ctx);
		});

		this.app.listen({ port: this.port }, () =>
			console.log(`🚀 Server ready at ${this.host}:${this.port}`)
		);
	}
}

const server = new Server();

server.launch();

process.on("uncaughtException", (err) => {
	logger.error("子进程内部错误：", err);
	process.exit(1);
});
