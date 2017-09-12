const DB = require("./db.js");
const SearchImg = require("./searchimg.js");
const Config = require("./config.js");

function getImgByWord() {
	console.log("get img by word");

	let sql = "select * from " + Config.dbWordsV1TableName + ";";
	console.log("query all existed words from words_v1 with :", sql);
	DB.db.query(sql, function(error, results, fields) {
		if (!error) {
			// console.log("res : " + JSON.stringify(results));
			// console.log(results.length);

			for (var i = 0; i < results.length; i++) {
				let wordIndex = results[i]["word_index"];
				// console.log(wordIndex);
				getWordByIndex(wordIndex);
			}
		} else {
			console.log("error : ", JSON.stringify(error));
		}
	});
}

function getWordByIndex(index) {
	let sql =
		"select * from " +
		Config.dbWordsTableName +
		" where id = " +
		index +
		";";
	// console.log('query WORDS with sql :',sql);
	DB.db.query(sql, function(error, results, fields) {
		if (!error) {
			console.log("query word by index res : " + JSON.stringify(results));
			if (results.length === 1) {
				let wordIndex = results[0]["id"];
				let word = results[0]["word"];

				console.log(wordIndex);
				console.log(word);
				SearchImg.searchImgByWord(word, wordIndex);
			} else {
				console.log(
					"wrong length with query WORDS results :",
					JSON.stringify(results)
				);
			}
		} else {
			console.log("error : ", JSON.stringify(error));
		}
	});
}
exports.getImgByWord = getImgByWord;
exports.getWordByIndex = getWordByIndex;
