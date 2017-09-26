const UserMemExpireCache = require("expire-cache");
const Config = require("./config.js");
const MyLog = require("./mylog.js");

function get(key) {
	return UserMemExpireCache.get(key);
}

function set(value) {
	UserMemExpireCache.set(value, 1, Config.UserMemExpireCacheExpire);

	MyLog.info("new cache value added: ", value);
}
exports.get = get;
exports.set = set;
