/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indices = [];
  }

  /**
   * A tokenizer method
   */
  tokenizer(string) {
      return string.trim().replace(/[^a-z\d\s]/ig, '').toLowerCase().split(/\s+/);
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
    let doc = 1;
    content.forEach(book => {
      for (let key in book) {
        this.tokenizer(book[key]).forEach(word => {
          if (!result.hasOwnProperty(word)) {
            result[word] = [];
          }
          if (result[word].indexOf(doc) > -1) {
            return;
          }
          result[word].push(doc);
        });
      }
      doc++;
    });
    const returnResult = {
      terms: result,
      count: content.length
    };
    this.indices[filePath] = returnResult;
    console.log(this.indices);
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
    const indexedFile = this.getIndex(filePath);
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
  test() {
    return 'test passed';
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
      const returnResult = {
        status: false,
        msg: 'Invalid Json File!'
      };
      return returnResult;
    }

    try {
      this.content.forEach((book) => {
        const bookTitle = Object.hasOwnProperty.call(book, 'title');
        const bookText = Object.hasOwnProperty.call(book, 'text');
        if (!(bookTitle && bookText)) {
          return { status: false };
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
