const dbhost = "59ad34e4531af.sh.cdb.myqcloud.com";
const dbport = 5810;
// prod db setting
// const dbhost = "172.17.16.9";
// const dbport = 3388;
const dbusr = "nxg";
const dbpassword = "nxgsql888";
const dbdatabase = "LOHOABC_ALPHA";
const dbBackupPath = "/backup/db/";

const dbUserWordsTableName = "user_words";
const dbWordsTableName = "WORDS";
const dbWordsV1TableName = "Words_v1";
const bingApiKey = "189bda1045ad40bfbae3e3a449d801f5";
const thumbImgsPath = "/static/wordimgs/thumb/";
const wordImgsPath = "/static/wordimgs/";

const dbUserWordsTableNameUid = "uid";
const dbUserWordsTableNameRecords = "records";
const dbUserWordsTableNameWord = "word";
const dbUserWordsTableNameTs = "ts";

const dbUserMemTableName = "user_mem";
const dbUserMemTableNameUid = "uid";
const dbUserMemTableNameServiceOpenId = "openid_service";
const dbUserMemTableNameABCOpenId = "openid_abc";
const dbUserMemTableNameInfo = "info";
const dbUserMemTableNameGroup = "group";
const dbUserMemTableNameVocabulary = "vocabulary";

const cookieUid = "uid";
const cookieOpenId = "openid";

const UserMemExpireCacheExpire = 1200; // 1200 seconds
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

const ErrDB = "ErrDB";
const ErrRequest = "ErrRequest";
const SaveTestHis = "sth";
const GetLastUserWord = "rluw";
const GetAllUserWords = "gauw";
const InsertNewUserWord = "inuw";
const NewUserMeM = "num";
const ErrCodeRequest = 4040;
const ErrCodeDB = 4050;
const ErrCodeUserMemNotExist = 4060;
const ErrCodeNewUserMemExisted = 4070;
const ErrCodePostRequest = 4080;
const ErrCodeUid = 4090;
const ErrCodeWechat = 5000;
const ErrCodeCache = 6000;
// ======================================================
// ======================================================
// ======================================================
exports.ErrCodeWechat = ErrCodeWechat;
exports.ErrCodeUid = ErrCodeUid;
exports.ErrCodeDB = ErrCodeDB;
exports.ErrCodeRequest = ErrCodeRequest;
exports.ErrCodeDB = ErrCodeDB;
exports.ErrCodeUserMemNotExist = ErrCodeUserMemNotExist;
exports.ErrCodeNewUserMemExisted = ErrCodeNewUserMemExisted;
exports.ErrCodePostRequest = ErrCodePostRequest;
exports.ErrCodeCache = ErrCodeCache;

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

exports.dbUserWordsTableName = dbUserWordsTableName;
exports.dbUserWordsTableNameUid = dbUserWordsTableNameUid;
exports.dbUserWordsTableNameRecords = dbUserWordsTableNameRecords;
exports.dbUserWordsTableNameWord = dbUserWordsTableNameWord;
exports.dbUserWordsTableNameTs = dbUserWordsTableNameTs;
exports.dbUserMemTableName = dbUserMemTableName;
exports.dbUserMemTableNameUid = dbUserWordsTableNameUid;

exports.dbUserMemTableNameServiceOpenId = dbUserMemTableNameServiceOpenId;
exports.dbUserMemTableNameABCOpenId = dbUserMemTableNameABCOpenId;
exports.dbUserMemTableNameInfo = dbUserMemTableNameInfo;
exports.dbUserMemTableNameGroup = dbUserMemTableNameGroup;
exports.dbUserMemTableNameVocabulary = dbUserMemTableNameVocabulary;

exports.InsertNewUserWord = InsertNewUserWord;
exports.GetAllUserWords = GetAllUserWords;
exports.NewUserMeM = NewUserMeM;
exports.SaveTestHis = SaveTestHis;
exports.GetLastUserWord = GetLastUserWord;
exports.UserMemExpireCacheExpire = UserMemExpireCacheExpire;

exports.cookieUid = cookieUid;
exports.cookieOpenId = cookieOpenId;
