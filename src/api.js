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
api.get("/wechat/login", function(req, res) {
	MyWechat.handleLogin(req, res);
});

api.get("/wechat/redirect", function(req, res) {
	MyWechat.handleRedirect(req, res);
});

api.get("/wechat/getuidcookie", function(req, res) {
	MyWechat.handleGetCookie(req, res);
});
// ======================== lohoabc ==============================

api.post("/testhis", function(req, res) {
	console.log(req.body.word);
	console.log(req.body.his);
	async.waterfall([
			Request.checkRequestData(req,Config.SaveTestHis),
			DB.saveTestHis
		], function(err, results) {
		if (!err) {
			res.json(req.body);
		}
	});
});

api.get("/all_words", function(req, res) {
	async.waterfall(
		[
			Request.checkRequestData(req, Config.GetAllUserWords),
			// don't need check user member , check when post word records
			// DB.checkUserMem,
			DB.getAllUserWords
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
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
			Request.checkRequestData(req, Config.GetLastUserWord),
			// don't need check user member , check when post word records
			// DB.checkUserMem,
			DB.getLastUserWord
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
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

api.post("/new_mem", function(req, res) {
	async.waterfall(
		[Request.checkRequestData(req, Config.NewUserMeM), DB.createUserMem],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
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
					case Config.ErrCodeNewUserMemExisted:
						MyLog.error(Config.ErrCodeNewUserMemExisted);
						MyLog.error(req.headers);
						res.json({
							status: "err",
							code: Config.ErrCodeNewUserMemExisted
						});
						break;
				}
			} else {
				res.json({ status: "ok" });
			}
		}
	);
});

api.post("/insert_new_word", function(req, res) {
	// MyLog.info(req.body);

	async.waterfall(
		[
			Request.checkRequestData(req, Config.InsertUserWord),
			// don't need check user member , check when post word records
			DB.checkUserMemForInsert,
			DB.insertUserWord
		],
		function(err, results) {
			if (err) {
				switch (results) {
					case Config.ErrCodeDB:
						MyLog.error(Config.ErrCodeDB);
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
					case Config.ErrCodeUserMemNotExist:
						MyLog.error(Config.ErrCodeUserMemNotExist);
						MyLog.error(req.headers);
						res.json({
							status: "err",
							code: Config.ErrCodeUserMemNotExist
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
