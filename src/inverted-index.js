var books = [{
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];
//create an inverted index class;
class invertedIndex {
  constructor() {
    this.indices = [];
  }
  tokenizer(string) {
      return string.replace(/[^a-z\d\s]/ig, '').split(/\s+/);
    }
    //implement a createIndex method
  createIndex(filename, content) {
    const result = {};
    let doc = 1;
    content.forEach(book => {
      for (let key in book) {
        this.tokenizer(book[key]).forEach(word => {
          if (!result.hasOwnProperty(word)) {
            result[word] = []
          }
          if (result[word].indexOf(doc) > -1) {
            return;
          }
          result[word].push(doc);
        });
      }
      doc++;
    });
    console.log(result);
    this.indices[books] = result;
  };

  getIndex(fileName) {
    return this.indices[fileName];
  };
  searchIndex(fileName, query) {

  }
}

const indexer = new invertedIndex();
indexer.createIndex('book', books);
indexer.getIndex('book', books);
