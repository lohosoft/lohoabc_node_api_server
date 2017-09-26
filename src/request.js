const Config = require("./config.js");
const MyCache = require("./memcache.js");

function checkUid(req, action) {
	let uid = req.signedCookies[Config.cookieUid];
	// every time login success , will cache the uid
	// if cache don't have the uid , it's error
	if (uid) {
		// cache works fine
		if (MyCache.get(uid)) {
			return function(callback) {
				callback(null, req, action);
			};
		} else {
			// cache error ====================  fatal error ============
			MyLog.error(Config.ErrCodeCache);
			MyLog.error(MyCache);
			return function(callback) {
				callback(new Error(), Config.ErrCodeCache);
			};
		}
	} else {
		return function(callback) {
			callback(new Error(), Config.ErrCodeRequest);
		};
	}
}

function checkRequestData(req, action) {
	//check valid data inside request and pass whole req go to next
	switch (action) {
		// get last user word
		case Config.GetLastUserWord:
		// get all user words
		case Config.GetAllUserWords:
			return function(callback) {
				callback(null, req, action);
			};
			break;
		// create new member to uid ============  TODO =======  at beginning just insert into database but with details about a member
		// case Config.NewUserMeM:
		// 	let uid = req.signedCookies["uid"];
		// 	if (uid2) {
		// 		return function(callback) {
		// 			callback(null, req);
		// 		};
		// 	} else {
		// 		return function(callback) {
		// 			callback(new Error(), Config.ErrCodeRequest);
		// 		};
		// 	}
		// 	break;

		case Config.InsertNewUserWord:
			let uid = req.signedCookies[Config.cookieUid];
			let word = req.body.word;
			let records = req.body.records;
			// =========maybe more detailed check on word and records in future   TODO =======================
			if (uid && records.length === word.length) {
				return function(callback) {
					callback(null, req);
				};
			} else {
				return function(callback) {
					callback(new Error(), Config.ErrCodeRequest);
				};
			}
			break;
	}
}
exports.checkUid = checkUid;
exports.checkRequestData = checkRequestData;
