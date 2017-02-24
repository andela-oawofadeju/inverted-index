/* eslint-disable no-unused-vars*/
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
   * @param {String} string
   * @returns{any} void
   */
  static tokenizer(string) {
    if (string && string.trim().length !== 0) {
      return string.replace(/[^a-z\d\s]/ig, ' ').trim().toLowerCase().split(/\s+/);
    }
  }

  /**
   * A createIndex method
   * It takes in the filePath and the contents of the filePath
   * @param {String} filePath
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
      Object.keys(book).forEach((key) => {
        InvertedIndex.tokenizer(book[key]).forEach((word) => {
          if (!Object.prototype.hasOwnProperty.call(result, word)) {
            result[word] = [];
          }
          if (result[word].indexOf(doc + 1) > -1) {
            return;
          }
          result[word].push(doc + 1);
        });
      });
    });

    const returnResult = {
      terms: result,
      count: content.length,
      filePath
    };

    if (filePath) {
      this.indices[filePath] = returnResult;
    }
  }

  /**
   * GetIndex
   * Gets the index of the files uploaded
   * @param {String} filePath
   * @returns {any} void
   */
  getIndex(filePath) {
    return this.indices[filePath];
  }

  /**
   * searchIndex method
   * @param {String} filePath uploaded valid JSON file
   * @param {String} query word(s) or terms to search for
   * @returns {Object} Returns result of searched index.
   */
  searchIndex(filePath, query) {
    const results = [];
    const result = {};
    let indices = {};
    if (this.getIndex(filePath)) {
      indices[filePath] = this.getIndex(filePath);
    } else {
      indices = this.indices;
    }
    Object.keys(indices).forEach((book) => {
      InvertedIndex.tokenizer(query).forEach((word) => {
        if (Object.prototype.hasOwnProperty.call(indices[book].terms, word)) {
          if (!Object.prototype.hasOwnProperty.call(result, book)) {
            result[book] = { terms: {}, count: indices[book].count, filePath: indices[book].filePath };
          }
          result[book].terms[word] = indices[book].terms[word];
        }
      });
      // !result[book] ||
      !result[book] || results.push(result[book]);
    });
    return results;
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
          return false;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
