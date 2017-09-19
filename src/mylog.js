const winston = require("winston");
// require("winston-daily-rotate-file");
require("winston-logrotate");

// const transport = new winston.transports.DailyRotateFile({
// 	filename: "/home/pampa/loho_api_server/log/log",
// 	datePattern: "yyyy-MM-dd.",
// 	prepend: true,
// 	level: process.env.ENV === "development" ? "debug" : "info"
// });
// const logger = new winston.Logger({
// 	transports: [transport]
// });

var rotateTransport = new winston.transports.Rotate({
	file: "/home/pampa/loho_api_server/log/my.log", // this path needs to be absolute
	colorize: true,
	timestamp: true,
	json: true,
	size: "100m",
	keep: 5,
	compress: true
});

var logger = new winston.Logger({ transports: [rotateTransport] });

// logger.info('Hello World!');

function error(error) {
	console.log("============= error : ", error);
	logger.error(error);
}

function info(info, data) {
	console.log("------------- info : ", info, data);
}

exports.error = error;
exports.info = info;
