import sql, { config } from "mssql";

const serverConfig: config = {
	user: "sa",
	password: "<Abcd1234>",
	server: "10.1.122.74",
	port: 1433,
	database: "DataBase",
};

export const link = async () => {
	try {
		const pool = new sql.ConnectionPool(serverConfig);
		await pool.connect();
		const result = await pool.query`select * from tb_user`;
		console.log(result);
	} catch (err) {
		console.error(err);
	}
};
