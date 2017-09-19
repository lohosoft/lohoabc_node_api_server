const mysql = require("mysql2");
const Config = require("./config.js");
const mysqlDump = require("mysqldump");
const MyLog = require("./mylog.js");
let UserMemExpireCache = require("expire-cache");
// demo
//  UserMemExpireCache.set('key2', 123, 10); // expire in 10 sec

const db = mysql.createConnection({
	host: Config.dbhost,
	user: Config.dbusr,
	password: Config.dbpassword,
	database: Config.dbdatabase,
	port: Config.dbport
});

function checkUserMemForInsert(req, callback) {
	let uid = req.body.uid;
	// check in cache, if exist return 1 else 0
	if (UserMemExpireCache.get(uid)) {
		// exist , return success
		callback(null, req);
	} else {
		let sql =
			"SELECT * FROM " +
			Config.dbUserMemTableName +
			" WHERE `uid` = '" +
			uid +
			"';";
		MyLog.info("check user mem for insert exec sql : ", sql);

		db.query(sql, function(err, results, fields) {
			// MyLog.info(results);

			if (!err && results.length !== 0) {
				MyLog.info(results);
				// add into cach
				UserMemExpireCache.set(uid, 1, Config.UserMemExpireCacheExpire);
				callback(null, req);
			} else if (results.length === 0) {
				// if user mem not exist, results === []

				// MyLog.info("user not exist : ", results);
				// MyLog.info("db error with sql :", sql);
				callback(new Error(), Config.ErrCodeUserMemNotExist);
			} else {
				callback(err, Config.ErrCodeDB);
			}
		});
	}
}

function getAllUserWords(req, callback) {
	let uid = req.query.uid;
	let sql = "SELECT * FROM user_words WHERE `uid` = '" + uid + "';";
	MyLog.info("exec sql : ", sql);

	db.query(sql, function(err, results, fields) {
		if (!err) {
			// MyLog.info(results);
			callback(null, results);
		} else {
			// MyLog.info(err);
			// MyLog.info("db error with sql :", sql);
			callback(err, Config.ErrCodeDB);
		}
	});
}

// db query with api async callback
function getLastUserWord(req, callback) {
	let uid = req.query.uid;
	let sql =
		"SELECT * FROM " +
		Config.dbUserWordsTableName +
		" WHERE `" +
		Config.dbUserWordsTableNameUid +
		"` = '" +
		uid +
		"' ORDER BY `" +
		Config.dbUserWordsTableNameTs +
		"` DESC LIMIT 1;";
	MyLog.info("exec sql : ", sql);

	db.query(sql, function(err, results, fields) {
		if (!err) {
			// MyLog.info(results);
			callback(null, results);
		} else {
			// MyLog.info(err);
			// MyLog.info("db error with sql :", sql);
			callback(err, Config.ErrCodeDB);
		}
	});
}

function insertUserWord(req, callback) {
	let uid = req.body.uid;
	let word = req.body.word;
	let records = req.body.records;
	let sql =
		"INSERT INTO " +
		Config.dbUserWordsTableName +
		" ( `" +
		Config.dbUserWordsTableNameUid +
		"`,`" +
		Config.dbUserWordsTableNameWord +
		"`,`" +
		Config.dbUserWordsTableNameRecords +
		"`) " +
		" VALUES " +
		"('" +
		uid +
		"','" +
		word +
		"','" +
		JSON.stringify(records) +
		"');";

	MyLog.info("exec sql : ", sql);
	db.query(sql, function(err, results, fields) {
		if (!err) {
			// MyLog.info(results);
			callback(null, results);
		} else {
			// MyLog.info(err);
			// MyLog.info("db error with sql :", sql);
			callback(err, Config.ErrCodeDB);
		}
	});
}

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
  		`group` VARCHAR(8) NOT NULL,\
  		`vocabulary` VARCHAR(8),\
  		`info` VARCHAR(100),\
  		`createDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  		`lastModified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  		PRIMARY KEY (`uid`)\
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

exports.insertUserWord = insertUserWord;
// exports.db = db;
// exports.backUpDbTable = backUpDbTable;
exports.createUserWordsTable = createUserWordsTable;
exports.createUserMemTable = createUserMemTable;
exports.getLastUserWord = getLastUserWord;
exports.checkUserMemForInsert = checkUserMemForInsert;
exports.getAllUserWords = getAllUserWords;
exports.createUserMem = createUserMem;
