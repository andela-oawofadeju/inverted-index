var books = [{
    "title": "Alice in Wonderland",
    "text": "Alice falls into elf a rabbit, hole. and enters a world full of imagination.",
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An alice unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring. imagination"
  }
];
var bookTwo = [{
    "title": "Alice in Wonderland",
    "text": "and enters a world full of imagination.",
  },

  {
    "title": "Hunger games The Fellowship of the Ring.",
    "text": "A game of life an death"
  }
];
class invertedIndex {

  constructor() {
    this.indices = [];
  }

  tokenizer(string) {
    return string.replace(/[^a-z\d\s]/ig, '')
      .toLowerCase()
      .split(/\s+/);
  }

  createIndex(fileName, content) {
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
    this.indices[fileName] = result;
  }

  getIndex(fileName) {
    return this.indices[fileName];
  }

  searchIndex(fileName, query) {
    const result = {};
    const indexedFile = this.getIndex(fileName);
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
const indexer = new invertedIndex();
indexer.createIndex('book', books);
indexer.createIndex('bookTwo', bookTwo);
indexer.getIndex('book', books);
console.log(indexer.searchIndex('book', "Alice"));
