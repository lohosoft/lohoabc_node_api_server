const Config = require("./config.js");
const fs = require("fs");
const BingSearch = require("node-bing-api")({ accKey: Config.bingApiKey });
const download = require("image-downloader");

console.log("dirname is : ", __dirname);
const wordImgsPath =
	__dirname
		.split("/")
		.slice(0, -1)
		.join("/") + Config.wordImgsPath;
console.log("wordimgs path is : ", wordImgsPath);

const wordImgsThumbPath =
	__dirname
		.split("/")
		.slice(0, -1)
		.join("/") + Config.thumbImgsPath;

console.log("word img thumb path is : ", wordImgsThumbPath);

function test() {
	console.log("bingsearchimg testing");
	BingSearch.images(
		"Ninja",
		{
			count: 2, // Number of results (max 50)
			offset: 0 // Skip first 3 result
		},
		function(error, res, body) {
			// console.log(res);
			// console.log(body.value[0]);
			let resArray = body.value;
		}
	);
}

function searchImgByWord(word, wordIndex) {
	BingSearch.images(
		word,
		{
			count: 8, // Number of results (max 50)
			offset: 0 // Skip first 3 result
		},
		function(error, res, body) {
			// console.log(res);
			// console.log(body.value[0]);
			if (!error) {
				let resArray = body.value;
				for (var i = 0; i < resArray.length; i++) {
					let imgUrl = resArray[i].contentUrl;
					let thumbUrl = resArray[i].thumbnailUrl;
					let type = resArray[i].encodingFormat;
					let imgName = wordIndex + "-" + i + "." + type;
					let thumbName = wordIndex + "-thumb-" + i + "." + type;
					console.log("handling image : with ", imgName, imgUrl);
					console.log(
						"handling image thumb : with ",
						thumbName,
						thumbUrl
					);
					// no need big image right now
					// downLoadImgs(imgUrl, wordImgsPath + imgName);
					downLoadImgs(thumbUrl, wordImgsThumbPath + thumbName);
				}
			} else {
				console.log("bing search error : ", error);
			}
		}
	);
}

function downLoadImgs(imgUrl, path) {
	let options = {
		url: imgUrl,
		dest: path // Save to /path/to/dest/photo.jpg
	};
	download
		.image(options)
		.then(({ filename, image }) => {
			console.log("File saved to", filename);
		})
		.catch(err => {
			throw err;
		});
}

function downLoadThumbImgs(thumbUrl, wordIndex, i) {
	// body...
}

// exports.wordImgsPath = wordImgsPath;
exports.test = test;
exports.searchImgByWord = searchImgByWord;
