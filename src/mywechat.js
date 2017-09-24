const OAuth = require("wechat-oauth");

// for lohosoft service
const client = new OAuth(
	"wx3233dd62e5169ba0",
	"a3c9d6cf1531f3a5dee55235b66e011c"
);

// for lohoabc
// const client = new OAuth(
// 	"wxf989ba56b3fd813b",
// 	"784bd92d3bb602aa2dbffc9488425f1e"
// );

const loginRedirectUrl = "https://www.lohosoft.cn/api/abc/wechat/redirect";
const loginState = "";
// const loginScope = "snsapi_userinfo";
const loginScope = "snsapi_base";
function handleLogin(req, res) {
	// console.log("wechat login handle req : ", req);
	let url = client.getAuthorizeURL(loginRedirectUrl, loginState, loginScope);
	console.log("redirect url is : ", url);
	res.redirect(url);
}

function handleRedirect(req, res) {
	let successRedictUrlRoot = "https://www.lohosoft.cn/s/abc/index.html";
	// console.log("handle redirect req :", req);
	let code = req.query.code;
	console.log("redirect code is : ", code);
	// echo only for get through setting check in open wechat console web page ==================
	// res.send(req.query.echostr);
	client.getAccessToken(code, function(err, result) {
		if (!err) {
			let accessToken = result.data.access_token;
			let openid = result.data.openid;
			console.log("got accessToken : ", accessToken);
			console.log("got openid : ", openid);
			client.getUser(openid, function(err, result) {
				if (!err) {
					let userInfo = result;
					console.log("userInfo is ", userInfo);
					// res.redirect(successRedictUrlRoot + userInfo.unionid);
					// res.send(userInfo);
					let redirectUrl = successRedictUrlRoot;

					// set cookies for ongoing use
					let options = {
						maxAge: 1000 * 60 * 15, // would expire after 15 minutes
						httpOnly: true, // The cookie only accessible by the web server

						// signed notworking yet ========  TODO
						signed: true // Indicates if the cookie should be signed
					};

					// Set cookie
					res.cookie("uid", userInfo.unionid, options); // options is optional

					res.redirect(redirectUrl);
				}
			});
		}
	});
}

function handleGetCookie(req, res) {
	// body...
	// let cookies = req.cookies;
	let cookies = req.signedCookies["uid"];
	console.log("cookies is :", cookies);
	res.send(cookies);
}
exports.handleGetCookie = handleGetCookie;
exports.handleLogin = handleLogin;
exports.handleRedirect = handleRedirect;
