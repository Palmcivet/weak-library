import mariadb from "mariadb";

export const sqlPool = mariadb.createPool({
	host: "10.1.122.74",
	port: 3307,
	user: "root",
	database: "Library",
	connectionLimit: 5,
});
