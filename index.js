const express = require("express");
const app = express();
const DB = require("./src/db.js");
const Config = require("./src/config.js");
var cors = require("cors");

app.use(cors());

// const WordUtils = require("./src/wordutils.js");
// WordUtils.getMapOfWordIndex();

// test word2vec
var Word2Vec = require("./src/word2vec/word2vec.js");
// console.log(Word2Vec);
// console.log(Word2Vec("donkey", 50));

// api/options/?word=apple

app.get("/api/options", function(req, res) {
	console.log(req.query.word);
	let queryWord = req.query.word;
	if (queryWord !== undefined) {
		let result = Word2Vec(queryWord, Config.Word2VecQueryNumber);
		res.send(JSON.stringify(result));
	} else {
		res.send("wrong parameter with");
	}
});

app.use(express.static("static"));

app.listen(8080, function() {
	console.log("Example app listening on port 8080!");
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
