const DB = require("./db.js");
const Config = require("./config.js");
const fs = require("fs");

let myMap = new Map();
let myMapSize;
function mapToJson(map) {
	return JSON.stringify([...map]);
}
function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}
function getMapOfWordIndex() {
	let sql = "select * from " + Config.dbWordsV1TableName + ";";
	console.log("query all existed words from words_v1 with :", sql);
	DB.db.query(sql, function(error, results, fields) {
		if (!error) {
			// console.log("res : " + JSON.stringify(results));
			// console.log(results.length);
			myMapSize = results.length;
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

				myMap.set(word, wordIndex);
				if (myMap.size === myMapSize) {
					console.log("get all word and wordIndex in map");
					let json = mapToJson(myMap);
					fs.writeFile("./wods2index.json", json, function(err) {
						if (err) {
							console.log(
								"write data to json file with err :",
								err
							);
						}

						console.log("The map json file was saved!");
					});
				}
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

exports.getMapOfWordIndex = getMapOfWordIndex;
