const Config = require("./config.js");

function checkRequestData(req, item) {
	// check valid data inside request and pass whole req go to next
	switch (item) {
		// check uid
		case Config.GetLastUserWord:
		// get all user words
		case Config.GetAllUserWords:
			let uid = req.query.uid;
			if (uid) {
				return function(callback) {
					callback(null, req);
				};
			} else {
				return function(callback) {
					callback(new Error(), Config.ErrCodeRequesst);
				};
			}
			break;
		// create new member to uid ============  TODO =======  at beginning just insert into database but with details about a member
		case Config.NewUserMeM:
			let uid2 = req.body.uid;
			if (uid2) {
				return function(callback) {
					callback(null, req);
				};
			} else {
				return function(callback) {
					callback(new Error(), Config.ErrCodeRequesst);
				};
			}
			break;
		// ======================  TODO ========= more detail check on request data
		case Config.InsertUserWord:
			let uid1 = req.body.uid;
			let word = req.body.word;
			let records = req.body.records;
			if (uid1 && records.length === word.length) {
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

exports.checkRequestData = checkRequestData;
