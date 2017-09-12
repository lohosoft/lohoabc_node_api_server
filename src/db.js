const mysql = require("mysql2");
const Config = require("./config.js");
const mysqlDump = require("mysqldump");

const db = mysql.createConnection({
	host: Config.dbhost,
	user: Config.dbusr,
	password: Config.dbpassword,
	database: Config.dbdatabase,
	port: Config.dbport
});

function backUpDbTable(tbnames, path) {
	mysqlDump(
		{
			host: Config.dbhost,
			user: Config.dbusr,
			password: Config.dbpassword,
			database: Config.dbdatabase,
			tables: tbnames, // only these tables
			// where: { players: "id < 1000" }, // Only test players with id < 1000
			// ifNotExist: true, // Create table if not exist
			dest: path // destination file
		},
		function(err) {
			// create data.sql file;
			if (!err) {
				console.log("db backup success : ",tbnames);
			} else {
				console.log("db backup error with : ",tbnames);
				console.log("err is :", err);
			}
		}
	);
}

exports.db = db;
exports.backUpDbTable = backUpDbTable;
