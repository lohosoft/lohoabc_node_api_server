const Config = require("./config.js");
const DB = require("./db.js");
// const Utils = require("./utils.js");
const fs = require("fs");
// const SearchImg = require("./searchimg.js");
const GetImg = require("./getimgbyword.js");

const wordImgsThumbPath =
	__dirname
		.split("/")
		.slice(0, -1)
		.join("/") + Config.thumbImgsPath;

function check() {
	// not working with async
	// let files = Utils.getFileNamesByPath(wordImgsThumbPath);
	// console.log(files);

	let res = [];
	fs.readdir(wordImgsThumbPath, (err, files) => {
		if (!err) {
			files.forEach(file => {
				// console.log(file);
				res.push(file);
			});
			// console.log(res);
			checkLocalImgs(res);
		}
	});
}

function checkLocalImgs(images) {
	let wordIndexs = [];
	for (var i = 0; i < images.length; i++) {
		let wordIndex = images[i].split("-")[0];
		// console.log(wordIndex);

		wordIndexs.push(wordIndex);
	}

	compareWithDb(wordIndexs);
}

function getImagesByIndexArray(array) {
	// console.log("target array lenght is :", array.length);
	for (var i = 0; i < array.length; i++) {
		console.log("target wordIndex is :", array[i]);

		GetImg.getWordByIndex(array[i]);
	}
}
function compareWithDb(wordIndexArray) {
	// remove repeat
	let dup = [...new Set(wordIndexArray)];
	// console.log("got img array: ", dup.length);

	let sql = "select * from Words_v1;";
	let res = [];
	DB.db.query(sql, function(error, results, fields) {
		if (!error) {
			// console.log("res : " + JSON.stringify(results));
			// console.log(results.length);

			for (var i = 0; i < results.length; i++) {
				let wordIndex = results[i]["word_index"];
				if (dup.indexOf(String(wordIndex)) === -1) {
					// console.log(wordIndex);
					res.push(wordIndex);
				}
			}
			console.log(res);
			// getImagesByIndexArray(res);
		} else {
			console.log("error : ", JSON.stringify(error));
		}
	});
}

exports.check = check;
