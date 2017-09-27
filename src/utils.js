const CryptoJS = require("crypto-js");
const Config = require("./config.js");
// test();

function test() {
	let encrypted = encrypt("hello");
	console.log("encrypted for hello : ", encrypted);
	let decrypted = decrypt(encrypted);
	console.log("decrypted for is ", decrypted);
}
function encrypt(data) {
	return CryptoJS.AES.encrypt(data, Config.CryptKey).toString();
}

function decrypt(data) {
	return CryptoJS.AES
		.decrypt(data.toString(), Config.CryptKey)
		.toString(CryptoJS.enc.Utf8);
}
exports.encrypt = encrypt;
exports.decrypt = decrypt;
