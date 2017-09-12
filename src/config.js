// const dbhost = "59ad34e4531af.sh.cdb.myqcloud.com";
// const dbport = 5810;
// prod db setting
const dbhost = "172.17.16.9";
const dbport = 3388;
const dbusr = "nxg";
const dbpassword = "nxgsql888";
const dbdatabase = "LOHOABC_ALPHA";
const dbBackupPath = "/backup/db/";

// const dbWordNetTableName = "WORD_NET";
const dbWordsTableName = "WORDS";
const dbWordsV1TableName = "Words_v1";
const bingApiKey = "189bda1045ad40bfbae3e3a449d801f5";
const thumbImgsPath = "/static/wordimgs/thumb/";
const wordImgsPath = "/static/wordimgs/";

const projectRootPath = __dirname
	.split("/")
	.slice(0, -1)
	.join("/");
// ============need create log folder first ==============
// console.log("logger dirname is : ", __dirname);
// const logFilePath =
// 	__dirname
// 		.split("/")
// 		.slice(0, -1)
// 		.join("/") + "/log/";
// console.log("logger handled path is : ", logFilePath);

// const infoLogFileName = "log_info.log";
// const errorLogFileName = "log_error.log";
// const exceptionsLogFileName = "exceptions.log";

// exports.logFilePath = logFilePath;
// exports.infoLogFileName = infoLogFileName;
// exports.errorLogFileName = errorLogFileName;
// exports.exceptionsLogFileName = exceptionsLogFileName;

exports.dbhost = dbhost;
exports.dbport = dbport;
exports.dbusr = dbusr;
exports.dbpassword = dbpassword;
exports.dbdatabase = dbdatabase;
exports.dbWordsTableName = dbWordsTableName;
exports.dbWordsV1TableName = dbWordsV1TableName;
exports.dbBackupPath = dbBackupPath;
exports.projectRootPath = projectRootPath;
exports.bingApiKey = bingApiKey;
exports.thumbImgsPath = thumbImgsPath;
exports.wordImgsPath = wordImgsPath;

exports.Word2VecQueryNumber = 50;
