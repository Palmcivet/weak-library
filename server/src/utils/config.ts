import { config as IMssqlConfig } from "mssql";

export const mssqlConfig: IMssqlConfig = {
	user: "sa",
	password: "<Abcd1234>",
	server: "10.1.122.74",
	port: 1433,
	database: "DataBase",
	options: {
		enableArithAbort: true,
	},
};

export const getConfig = () =>
	process.env.NODE_ENV === "development"
		? {
				port: 8081,
				address: "127.0.0.1",
		  }
		: {
				port: 8080,
				address: "10.1.122.74",
		  };
