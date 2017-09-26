const OAuth = require("wechat-oauth");
const MyLog = require("./mylog.js");
const DB = require("./db.js");
const Config = require("./config.js");

// for lohosoft service
const clientService = new OAuth(
	"wx3233dd62e5169ba0",
	"a3c9d6cf1531f3a5dee55235b66e011c"
);

// for lohoabc
// const clientABC = new OAuth(
// 	"wxf989ba56b3fd813b",
// 	"784bd92d3bb602aa2dbffc9488425f1e"
// );

const loginRedirectUrl = "https://www.lohosoft.cn/api/abc/wechat/redirect";
const loginState = "";
const loginInfoScope = "snsapi_userinfo";
const loginBaseScope = "snsapi_base";

function handleLogin(req, res) {
	handleServiceLogin(req, res);
}
function handleRedirect(req, res) {
	handleServiceRedirect(req, res);
}
function handleServiceLogin(req, res) {
	// MyLog.info("wechat login handle req : ", req);
	let url = clientService.getAuthorizeURL(
		loginRedirectUrl,
		loginState,
		loginBaseScope
	);
	MyLog.info("redirect url is : ", url);
	res.redirect(url);
}

function handleServiceRedirect(req, res) {
	let successRedictUrlRoot = "https://www.lohosoft.cn/abc/index.html";
	// MyLog.info("handle redirect req :", req);
	let code = req.query.code;
	MyLog.info("redirect code is : ", code);
	// echo only for get through setting check in open wechat MyLog.info page ==================
	// res.send(req.query.echostr);
	clientService.getAccessToken(code, function(err, result) {
		if (!err) {
			let accessToken = result.data.access_token;
			let openid = result.data.openid;
			MyLog.info("got accessToken : ", accessToken);
			MyLog.info("got openid : ", openid);
			clientService.getUser(openid, function(err, result) {
				if (!err) {
					let userInfo = result;
					MyLog.info("userInfo is ", userInfo);
					// res.redirect(successRedictUrlRoot + userInfo.unionid);
					// res.send(userInfo);
					let redirectUrl = successRedictUrlRoot;

					// set cookies for ongoing use
					let options = {
						maxAge: 1000 * 60 * 60, // would expire after 60 minutes
						httpOnly: true, // The cookie only accessible by the web server

						// signed notworking yet ========  TODO
						signed: true // Indicates if the cookie should be signed
					};

					// Set cookie
					let uid = userInfo.unionid;
					res.cookie(Config.cookieOpenId, openid, options);
					res.cookie(Config.cookieUid, uid, options); // options is optional

					res.redirect(redirectUrl);
					// every time user login , try to create user
					// ==============maybe record user login history ===========TODO
					//DB.recordLogin(uid);
					DB.tryInsertUserMem(uid, openid);
				} else {
					MyLog.error(Config.ErrCodeWechat);
					MyLog.error(err);
				}
			});
		}
	});
}

function handleGetCookie(req, res) {
	// body...
	// let cookies = req.cookies;
	let cookies = req.signedCookies["uid"];
	MyLog.info("cookies is :", cookies);
	res.send(cookies);
}

exports.handleGetCookie = handleGetCookie;

// may not export service or abc handle
exports.handleLogin = handleLogin;
exports.handleRedirect = handleRedirect;
