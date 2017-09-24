// const compression = require("compression");
const args = process.argv;
console.log(args);
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
// set for cookie name
app.use(cookieParser("uid"));

const Config = require("./src/config.js");
const Api = require("./src/api.js");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// use nginx instead compression
// app.use(compression());

// only for dev enable cors
app.use(cors());

app.use("/api/abc", Api);

const port = args[2];

// ===============  init db tables ====================
// const DB = require("./src/db.js");
// DB.insertUserWord("testuid", "world", [0, 6, 1, 3, 0]);
// DB.createUserWordsTable();
// DB.createUserMemTable();
// DB.createUserMem('testuid1');
// app.use(express.static("static"));

app.listen(port, function() {
	console.log("Example app listening on port : ", port);
});

// const SearchImg = require("./src/searchimg.js");
// const GetImg = require("./src/getimgbyword.js");
// const CheckWordImg = require("./src/checkwordimgs.js");

// const dbName = Config.dbdatabase;
// const tableNames = [];
// tableNames.push(Config.dbWordsTableName);
// const dbBackupPath = Config.projectRootPath + Config.dbBackupPath;
// console.log(dbBackupPath);
// // console.log(dbName);
// console.log(tableNames);
// DB.backUpDbTable(tableNames, dbBackupPath);

// backup WORDS table

// CheckWordImg.check();

// let targetIndexArray = [ ];

// for (var i = 0; i < targetIndexArray.length; i++) {
// 	GetImg.getWordByIndex(targetIndexArray[i]);
// }
// console.log(DB.db);

// SearchImg.test();
// SearchImg.searchImgByWord('pig',10);

// GetImg.getImgByWord();
