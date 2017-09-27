// const compression = require("compression");
const args = process.argv;
console.log(args);
const Config = require("./src/config.js");
const MyLog = require("./src/mylog.js");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
// set for cookie name
app.use(cookieParser(Config.cookieUid));
app.use(cookieParser(Config.cookieOpenId));

const Api = require("./src/api.js");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// use nginx instead compression
// app.use(compression());

// only for dev enable cors =========================================
app.use(cors());
// ==================================================================

app.use("/api/abc", Api);

const port = args[2];
console.log("__dirname is : ", __dirname);
const logPath = __dirname + "/log/";
const infoLogFileName = port + "_log_info.log";
const errorLogFileName = port + "_log_error.log";
const exceptionsLogFileName = port + "_exceptions.log";
// init for log settings

MyLog.init(logPath, infoLogFileName, errorLogFileName, exceptionsLogFileName);

app.listen(port, function() {
	console.log("Example app listening on port : ", port);
});
