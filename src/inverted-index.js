const books = [{
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

class InvertedIndex {

  constructor() {
    this.indices = [];
  }

  tokenizer(string) {
    return string.replace(/[^a-z\d\s]/ig, '')
      .toLowerCase()
      .split(/\s+/);
  }

  createIndex(filePath, content) {
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
    const returnResult = {
      terms: result,
      count: content.length
    };
    this.indices[filePath] = returnResult;
  }

  getIndex(filePath) {
    return this.indices[filePath];
  }

  searchIndex(filePath, query) {
    const result = {};
    const indexedFile = this.getIndex(filePath);
    if (!query || !indexedFile) {
      return "file does not exist";
    }
    this.tokenizer(query).forEach(word => {
      if (indexedFile.hasOwnProperty(word)) {
        result[word] = indexedFile[word];
      }
    });
    return result;
  }

  test() {
    return 'test passed';
  }
}
