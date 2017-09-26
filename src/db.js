const mysql = require("mysql2");
const Config = require("./config.js");
const mysqlDump = require("mysqldump");
const MyLog = require("./mylog.js");
const MyCache = require("./memcache.js");
// demo
//  MyCache.set('key2', 123, 10); // expire in 10 sec

const db = mysql.createConnection({
	host: Config.dbhost,
	user: Config.dbusr,
	password: Config.dbpassword,
	database: Config.dbdatabase,
	port: Config.dbport
});

// function checkUserMemForInsert(req, callback) {
// 	let uid = req.body.uid;
// 	// check in cache, if exist return 1 else 0
// 	if (MyCache.get(uid)) {
// 		// exist , return success
// 		callback(null, req);
// 	} else {
// 		let sql =
// 			"SELECT * FROM " +
// 			Config.dbUserMemTableName +
// 			" WHERE `uid` = '" +
// 			uid +
// 			"';";
// 		MyLog.info("check user mem for insert exec sql : ", sql);

// 		db.query(sql, function(err, results, fields) {
// 			// MyLog.info(results);

// 			if (!err && results.length !== 0) {
// 				MyLog.info(results);
// 				// add into cach
// 				MyCache.set(uid, 1, Config.UserMemExpireCacheExpire);
// 				callback(null, req);
// 			} else if (results.length === 0) {
// 				// if user mem not exist, results === []

// 				// MyLog.info("user not exist : ", results);
// 				// MyLog.info("db error with sql :", sql);
// 				callback(new Error(), Config.ErrCodeUserMemNotExist);
// 			} else {
// 				callback(err, Config.ErrCodeDB);
// 			}
// 		});
// 	}
// }

// all database related operation error with db error info , back with callback to api
function getAllUserWords(req, callback) {
	let uid = req.signedCookies[Config.cookieUid];
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
	let uid = req.signedCookies[Config.cookieUid];
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
			callback(null, results);
		} else {
			callback(err, Config.ErrCodeDB);
		}
	});
}

function insertNewUserWord(req, callback) {
	let uid = req.signedCookies[Config.cookieUid];
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
// from mywechat request after work done, no callback needed
// data are from wechat api ,means it's good ,just try insert

function tryInsertUserMem(uid, service_openid) {
	// if not in cache
	if (!(MyCache.get(uid) && MyCache.get(service_openid))) {
		MyLog.info("cache don't have value for uid : ", uid);
		MyCache.set(uid, 1, Config.UserMemExpireCacheExpire);
		MyCache.set(service_openid, 1, Config.UserMemExpireCacheExpire);
	}

	// if not existed in database , add it
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
			// ok, do nothing
		} else if (results.length === 0) {
			// user mem not exist, results === []
			// MyLog.info("user not exist : ", results);
			// MyLog.info("db error with sql :", sql);
			let sql =
				"INSERT INTO " +
				Config.dbUserMemTableName +
				" ( `" +
				Config.dbUserMemTableNameUid +
				"`,`" +
				Config.dbUserMemTableNameServiceOpenId +
				"`) " +
				" VALUES " +
				"('" +
				uid +
				"','" +
				service_openid +
				"');";
			MyLog.info("exec sql : ", sql);
			db.query(sql, function(err, results, fields) {
				if (err) {
					MyLog.error(err, Config.ErrCodeDB);
				}
			});
		} else {
			MyLog.error(err, Config.ErrCodeDB);
		}
	});
}

// ================  TODO ===============
// function recordLogi(uid) {}

// exports.recordLogin = recordLogin;
exports.tryInsertUserMem = tryInsertUserMem;

exports.insertNewUserWord = insertNewUserWord;

exports.getLastUserWord = getLastUserWord;

exports.getAllUserWords = getAllUserWords;
