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
   * @param {String | Array} query
   * @returns{any} void
   */
  static tokenizer(query) {
    let string = '';
    if (Array.isArray(query)) {
      query.forEach((term) => {
        string += `${term} `;
      });
    } else {
      string = query;
    }

    if (string && string.trim().length !== 0) {
      return string.replace(/[^a-z\d\s]/ig, ' ')
      .trim()
      .toLowerCase()
      .split(/\s+/);
    }
  }

  /**
   * A createIndex method
   * It takes in the fileName and the contents of the fileName
   * @param {String} fileName
   * @param {Object} fileContent
   * @returns {Object} Returns object containing index
   */
  createIndex(fileName, fileContent) {
    const result = {};
    // store all json files uploaded in an array which is this.allBooks
    if (!fileName) {
      fileContent = this.allBooks;
    }
    fileContent.forEach((book, doc) => {
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
      count: fileContent.length,
      fileName
    };
    if (fileName) {
      this.indices[fileName] = returnResult;
    }
  }

  /**
   * GetIndex
   * Gets the index of the files uploaded
   * @param {String} fileName
   * @returns {any} void
   */
  getIndex(fileName) {
    return this.indices[fileName];
  }

  /**
   * searchIndex method
   * @param {String} fileName uploaded valid JSON file
   * @param {String} query word(s) or terms to search for
   * @returns {Object} Returns result of searched index.
   */
  searchIndex(fileName, ...query) {
    const results = [];
    const result = {};
    let indices = {};
    if (this.getIndex(fileName)) {
      indices[fileName] = this.getIndex(fileName);
    } else {
      indices = this.indices;
    }
    Object.keys(indices).forEach((book) => {
      InvertedIndex.tokenizer(query).forEach((word) => {
        if (Object.prototype.hasOwnProperty.call(indices[book].terms, word)) {
          if (!Object.prototype.hasOwnProperty.call(result, book)) {
            result[book] = {
              terms: {},
              count: indices[book].count,
              fileName: indices[book].fileName
            };
          }
          result[book].terms[word] = indices[book].terms[word];
        }
      });
      results.push(result[book]);
    });
    if (typeof results[0] === 'undefined') {
      return false;
    }
    return results;
  }

  /**
   * validateFile a method to validate json file
   * @param {Object} fileContent
   * @returns {Object} Returns message in Json format.
   */
  static validateFile(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      return false;
    }
    let isValid = false;
    try {
      fileContent.forEach((book) => {
        const bookTitle = Object.prototype.hasOwnProperty.call(book, 'title');
        const bookText = Object.prototype.hasOwnProperty.call(book, 'text');

        if ((bookTitle && bookText)) {
          isValid = true;
        }
      });
      return isValid;
    } catch (err) {
      return false;
    }
  }
}
