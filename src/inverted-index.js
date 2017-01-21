const books = require('./books.js').books;

class InvertedIndex {

  constructor() {
    this.indices = [];
  }

  tokenizer(string) {
    return string.replace(/[^a-z\d\s]/ig, '')
      .toLowerCase()
      .split(/\s+/);
  }

  createIndex(filePath) {
    let content = books;
    const result = {};
    let doc = 1;
    content.forEach(book => {
      for (let key in book) {
        // console.log(this.tokenizer(book[key]))
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
    this.indices[filePath] = result;
  }

  getIndex(filePath) {
    return this.indices[filePath];
  }

  searchIndex(filePath, query) {
    const result = {};
    const indexedFile = this.getIndex(filePath);
    if (!query || !indexedFile) {
      return "file dose not exist";
    }
    this.tokenizer(query).forEach(word => {
      if (indexedFile.hasOwnProperty(word)) {
        result[word] = indexedFile[word];
      }
    });
    return result;
  }
}


module.exports = new InvertedIndex();
