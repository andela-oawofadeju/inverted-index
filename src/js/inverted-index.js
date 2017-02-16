/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indices = [];
    this.allBooks = [];
  }

  /**
   * A tokenizer method
   */
  tokenizer(string) {
    return string.replace(/[^a-z\d\s]/ig, ' ').trim().toLowerCase().split(/\s+/);
  }

  /**
   * A createIndex method
   * It takes in the filePath and the contents of the filePath
   * @param {Object} filePath
   * @param {Object} content
   * @returns {Object} Returns object containing index
   */
  createIndex(filePath, content) {
    const result = {};
    // store all json files uploaded in an array which is this.allBooks
    if (!filePath) {
      content = this.allBooks;
    }

    content.forEach((book, doc) => {
      for (const key in book) {
        this.tokenizer(book[key]).forEach((word) => {
          if (!result.hasOwnProperty(word)) {
            result[word] = [];
          }
          if (result[word].indexOf(doc + 1) > -1) {
            return;
          }
          result[word].push(doc + 1);
        });
      }
    });
    const returnResult = {
      terms: result,
      count: content.length,
      filePath
    };

    if (filePath) {
      this.indices[filePath] = returnResult;
    } else {
      this.fullIndex = returnResult;
    }
  }

  /**
   * GetIndex
   * Gets the index of the files uploaded
   * @param {any} filename
   * @returns {any} void
   */
  getIndex(filePath) {
    return this.indices[filePath];
  }

  /**
   * Search index method
   * @param {String} filePath word(s) or terms to search for
   *  * @param {String} query
   * @returns {Object} Returns result of searched index.
   */
  searchIndex(filePath, query) {
    let results = []
    let result = {}
    let indices = {};
    if (this.getIndex(filePath)) {
      indices[filePath] = this.getIndex(filePath);
    } else {
      indices = this.indices;
    }
    Object.keys(indices).forEach((book) => {
      this.tokenizer(query).forEach((word) => {
        if (indices[book].terms.hasOwnProperty(word)) {
          if (!result.hasOwnProperty(book)) {
            result[book] = { terms: {}, count: indices[book].count, filePath: indices[book].filePath };
          }
          result[book]["terms"][word] = indices[book].terms[word];
        }
      });
      !result[book] || results.push(result[book]);
    });
    return results
  }

  /**
   * validateFile a method to validate json file
   * @param {Object} content
   * @returns {Array} Returns message in Json format.
   */

  validateFile(content) {
    if (typeof content !== 'object' || content.length === 0) {
      return false;
    }

    try {
      content.forEach((book) => {
        const bookTitle = Object.hasOwnProperty.call(book, 'title');
        const bookText = Object.hasOwnProperty.call(book, 'text');
        if (!(bookTitle && bookText)) {
          throw new Error('Invalid book');
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
//module.exports = InvertedIndex;
