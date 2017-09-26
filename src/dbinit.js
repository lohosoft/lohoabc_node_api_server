const mysql = require("mysql2");
const Config = require("./config.js");
const mysqlDump = require("mysqldump");
const MyLog = require("./mylog.js");

// demo
//  UserMemExpireCache.set('key2', 123, 10); // expire in 10 sec

const db = mysql.createConnection({
	host: Config.dbhost,
	user: Config.dbusr,
	password: Config.dbpassword,
	database: Config.dbdatabase,
	port: Config.dbport
});

createUserMemTable();
// ===================================================
// ---------------------------------------------------

function createUserWordsTable() {
	let sql =
		// "DROP TABLE IF EXISTS `user_words`;\
		"CREATE TABLE `user_words` (\
  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
  		`uid` VARCHAR(32) NOT NULL,\
  		`word` VARCHAR(32) NOT NULL,\
  		`records` VARCHAR(100) NOT NULL,\
  		`ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  		PRIMARY KEY (`id`),\
  		INDEX `uid_index_of_user_words` (`uid`)\
		) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";
	db.query(sql, function(err, results, fields) {
		if (!err) {
			MyLog.info(results);
		} else {
			MyLog.error(err);
			MyLog.error("db error with sql :", sql);
		}
	});
}
// only locally maybe ==============  TODO
function createUserMem(req, callback) {
	let uid = req.body.uid;
	let sql =
		"INSERT INTO " +
		Config.dbUserMemTableName +
		" ( `" +
		Config.dbUserMemTableNameUid +
		"`) " +
		" VALUES " +
		"('" +
		uid +
		"');";
	MyLog.info("exec sql : ", sql);
	db.query(sql, function(err, results, fields) {
		if (!err) {
			// MyLog.info(results);
			callback(null, results);
		} else {
			// MyLog.info(err);
			// MyLog.info("db error with sql :", sql);
			callback(err, Config.ErrCodeNewUserMemExisted);
		}
	});
}
function createUserMemTable() {
	let sql =
		"CREATE TABLE `user_mem` (\
  		`uid` VARCHAR(32) NOT NULL,\
  		`openid_abc` VARCHAR(32),\
  		`openid_service` VARCHAR(32),\
  		`group` VARCHAR(8),\
  		`vocabulary` VARCHAR(8),\
  		`info` VARCHAR(500),\
  		`createDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  		`lastModifiedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  		PRIMARY KEY (`uid`),\
  		INDEX `usermem_index_of_openid_abc` (`openid_abc`),\
  		INDEX `usermem_index_of_openid_service` (`openid_service`)\
		) ENGINE=INNODB DEFAULT CHARSET=utf8;";
	db.query(sql, function(err, results, fields) {
		if (!err) {
			MyLog.info(results);
		} else {
			MyLog.error(err);
			MyLog.error("db error with sql :", sql);
		}
	});
}

// function backUpDbTable(tbnames, path) {
// 	mysqlDump(
// 		{
// 			host: Config.dbhost,
// 			user: Config.dbusr,
// 			password: Config.dbpassword,
// 			database: Config.dbdatabase,
// 			tables: tbnames, // only these tables
// 			// where: { players: "id < 1000" }, // Only test players with id < 1000
// 			// ifNotExist: true, // Create table if not exist
// 			dest: path // destination file
// 		},
// 		function(err) {
// 			// create data.sql file;
// 			if (!err) {
// 				MyLog.info("db backup success : ", tbnames);
// 			} else {
// 				MyLog.info("db backup error with : ", tbnames);
// 				MyLog.info("err is :", err);
// 			}
// 		}
// 	);
// }
