const findSimilarWordsWithWordNumber = function(word, numToShow) {
    console.log(
        "got similar words for word : " + word + "  and number  : " + numToShow
    );

    // var wordVecs = require("./wordvecs5000.js");
    // console.log(wordVecs);
    var Word2VecUtils = require("./word2vecutils.js");
    /*************
   * constants */
    // var WORDS = Object.keys(wordVecs);
    var simWords = Word2VecUtils.findSimilarWords(numToShow, word);

    return simWords;
};

module.exports = findSimilarWordsWithWordNumber;
