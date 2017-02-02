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
    if (!filePath) {
      content = this.allBooks;
    }

    content.forEach((book, doc) => {
      for (let key in book) {
        this.tokenizer(book[key]).forEach(word => {
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
      count: content.length
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
    const result = {};
    let indexedFile;
    if (filePath) {
      indexedFile = this.getIndex(filePath);
    } else {
      indexedFile = this.fullIndex;
    }

    if (!query || !indexedFile) {
      return 'file does not exist';
    }
    this.tokenizer(query).forEach(word => {
      if (indexedFile.terms.hasOwnProperty(word)) {
        result[word] = indexedFile.terms[word];
      }
    });
    const returnResult = {
      terms: result,
      count: indexedFile.count
    };
    return returnResult;
  }

  /**
   * validateFile a method to validate json file
   * @param {Object} content
   * @returns {Array} Returns message in Json format.
   */

  validateFile(content) {
    const fileName = this.indices;
    let status = true;
    if (typeof content !== 'object' || content.length === 0) {

      return false;
    }

    try {
      content.forEach((book) => {
        const bookTitle = Object.hasOwnProperty.call(book, 'title');
        const bookText = Object.hasOwnProperty.call(book, 'text');
        if (!(bookTitle && bookText)) {
          throw new Error("Invalid book");
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
