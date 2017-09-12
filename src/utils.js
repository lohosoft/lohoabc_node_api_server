const fs = require("fs");

function getFileNamesByPath(path) {
	let res = [];
	fs.readdir(path, (err, files) => {
		if (!err) {
			files.forEach(file => {
				// console.log(file);
				res.push(file);
			});
			return res;
		}
	});

}

exports.getFileNamesByPath = getFileNamesByPath;
