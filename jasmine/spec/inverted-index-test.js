const indexer = require('../src/js/inverted-index.js');
const invertedIndex = new indexer();
const fs = require('fs');
const validbook = fs.readFileSync(__dirname + '/books.json');
const emptyBook = fs.readFileSync(__dirname + '/books copy.json');
const invalidBook = fs.readFileSync(__dirname + '/books copy 2.json');



// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(invertedIndex.validateFile(emptyBook).status).toEqual(false);
  });

  it('Should return true for valid json file', () => {
    expect(invertedIndex.validateFile(validbook).status).toEqual(true);
  });

  it('Should return false if json does not contain title abd text', () => {
    expect(invertedIndex.validateFile(invalidBook).status).toEqual(false);
  });
});

describe('Populate Index', () => {
  it('Should ensure that index is created once the file has been read', () => {
    expect(invertedIndex.createIndex('books.json', 'books')).toBeDefined();
  });
  it('Should maps the string keys to the correct objects', () => {
    expect(invertedIndex.getIndex('books.json').alice).toEqual([0]);
  });
  it('Should return an object that is an accurate index of the content of the json file',
    () => {
      expect(invertedIndex.getIndex()).toBeDefined();
    });
});

describe('Search Index', () => {
  it('Should return correct index of the search term', () => {
    expect(invertedIndex.searchIndex('alice, a')).toEqual({
      'books.json': {
        alice: [0],
        a: [0, 1]
      }
    });
  });
  it('Should return books.json:{} when no result is found',
    () => {
      expect(invertedIndex.searchIndex('along', invertedIndex.getIndex()[0])).toEqual({
        'books.json': {}
      });
    });
  it('Should return correct index in an array search terms', () => {
    expect(invertedIndex.searchIndex('alice, [hole,[a]]')).toEqual({
      'books.json': {
        alice: [0],
        hole: [0],
        a: [0, 1]
      }
    });
  });
});
