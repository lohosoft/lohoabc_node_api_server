const Request = require("./request.js");
const Config = require("./config.js");
const DB = require("./db.js");
const MyLog = require("./mylog.js");
const async = require("async");
const MyWechat = require("./mywechat.js");
const api = require("express").Router();

// --------------------------  test ===================
api.get("/echo", function(req, res) {
	// console.log(req);
	res.json(req.headers);
});

// ===================  wechat related =======================
// not use async , just pass req and res let my wechat handle
api.get("/wechat/login", function(req, res) {
	MyWechat.handleLogin(req, res);
});

api.get("/wechat/redirect", function(req, res) {
	MyWechat.handleRedirect(req, res);
});

// api.get("/wechat/getuidcookie", function(req, res) {
// 	MyWechat.handleGetCookie(req, res);
// });
// ======================== lohoabc ==============================
// use async pass req through , responds reply result , error handling
api.get("/all_words", function(req, res) {
	async.waterfall(
		[
			Request.checkUid(req, Config.GetAllUserWords),
			Request.checkRequestData,
			DB.getAllUserWords
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeCache:
						MyLog.error(Config.ErrCodeCache);

						res.json({ status: "err", code: Config.ErrCodeCache });
						break;
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
						// record database error info
						MyLog.error(err);
						MyLog.error(req.headers);
						res.json({ status: "err", code: Config.ErrCodeDB });
						break;
					case Config.ErrCodeRequest:
						MyLog.error(Config.ErrCodeRequest);
						MyLog.error(req.headers);

						res.json({
							status: "err",
							code: Config.ErrCodeRequest
						});
						break;
				}
			} else {
				res.json({ status: "ok", data: results });
			}
		}
	);
});
// index.js set /api path already
api.get("/last_word", function(req, res) {
	async.waterfall(
		[
			// request will handle if user exist
			Request.checkUid(req, Config.GetLastUserWord),
			Request.checkRequestData,
			// don't need check user member , check when post word records
			DB.getLastUserWord
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeCache:
						MyLog.error(Config.ErrCodeCache);

						res.json({ status: "err", code: Config.ErrCodeCache });
						break;
					// not using yet
					// case Config.ErrCodeUid:
					// 	// invalid uid with the request
					// 	MyLog.error(Config.ErrCodeUid);
					// 	MyLog.error(req.headers);
					// 	res.json({ status: "err", code: Config.ErrCodeUid });
					// 	break;
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
						// record database error info
						MyLog.error(err);
						MyLog.error(req.headers);

						res.json({ status: "err", code: Config.ErrCodeDB });
						break;
					case Config.ErrCodeRequest:
						// bad api request
						MyLog.error(Config.ErrCodeRequest);
						MyLog.error(req.headers);

						res.json({
							status: "err",
							code: Config.ErrCodeRequest
						});
						break;
				}
			} else {
				res.json({ status: "ok", data: results });
			}
		}
	);
});

// not for api , use locally maybe
// api.post("/new_mem", function(req, res) {
// 	async.waterfall(
// 		[
// 			Request.checkUid(req, Config.NewUserMeM),
// 			Request.checkRequestData,
// 			DB.createUserMem
// 		],
// 		function(err, results) {
// 			if (err) {
// 				switch (results) {
// 					case Config.ErrCodeDB:
// 						MyLog.error(Config.ErrCodeDB);
// 						MyLog.error(req.headers);

// 						res.json({ status: "err", code: Config.ErrCodeDB });
// 						break;
// 					case Config.ErrCodeRequest:
// 						MyLog.error(Config.ErrCodeRequest);
// 						MyLog.error(req.headers);

// 						res.json({
// 							status: "err",
// 							code: Config.ErrCodeRequest
// 						});
// 						break;
// 					case Config.ErrCodeNewUserMemExisted:
// 						MyLog.error(Config.ErrCodeNewUserMemExisted);
// 						MyLog.error(req.headers);
// 						res.json({
// 							status: "err",
// 							code: Config.ErrCodeNewUserMemExisted
// 						});
// 						break;
// 				}
// 			} else {
// 				res.json({ status: "ok" });
// 			}
// 		}
// 	);
// });

api.post("/insert_new_word", function(req, res) {
	// MyLog.info(req.body);

	async.waterfall(
		[
			Request.checkUid(req, Config.InsertNewUserWord),
			Request.checkRequestData,
			DB.insertNewUserWord
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
						// record database error info
						MyLog.error(err);
						MyLog.error(req.headers);
						res.json({ status: "err", code: Config.ErrCodeDB });
						break;
					case Config.ErrCodeRequest:
						MyLog.error(Config.ErrCodeRequest);
						MyLog.error(req.headers);
						res.json({
							status: "err",
							code: Config.ErrCodeRequest
						});
						break;
				}
			} else {
				res.json({ status: "ok" });
			}
		}
	);
});

// must export like this =====================
module.exports = api;
