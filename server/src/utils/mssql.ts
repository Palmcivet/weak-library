import sql from "mssql";

import { logger } from "./logger";
import { mssqlConfig } from "./config";

export const connectServer = async () => {
	try {
		const pool = new sql.ConnectionPool(mssqlConfig);
		await pool.connect();
		const result = await pool.query`select * from tb_user`;
		logger.info(result);
	} catch (err) {
		logger.error(err);
	}
};
