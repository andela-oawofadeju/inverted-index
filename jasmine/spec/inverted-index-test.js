// // const indexer = require('../src/js/inverted-index.js');
// const index = require('../../src/js/inverted-index');
const invertedIndex = new InvertedIndex();
// const fs = require('fs');
// const validbook = fs.readFileSync('../books.json');
// const emptyBook = fs.readFileSync('../books copy.json');
// const invalidBook = fs.readFileSync('../books copy 2.json');


describe("Inverted Index", () => {

  beforeEach(() => {
    invertedIndex.createIndex('books.json', validBook);
  });

  // this is test suite
  describe('Read book data', () => {
    it('Should return false for empty json array', () => {
      expect(invertedIndex.validateFile(emptyBook)).toEqual(false);
    });

    it('Should return true for valid json file', () => {
      expect(invertedIndex.validateFile(validBook)).toEqual(true);
    });

    it('Should return false if json does not contain title abd text', () => {
      expect(invertedIndex.validateFile(invalidBook)).toEqual(false);
    });
  });

  describe('Populate Index', () => {
    it('Should ensure that index is created once the file has been read', () => {
      expect(invertedIndex.indices['books.json']).toBeDefined();
    });
    it('Should maps the string keys to the correct objects', () => {
      expect(invertedIndex.getIndex('books.json').terms.alice).toEqual([1]);
    });
    it('Should return an object that is an accurate index of the content of the json file',
      () => {
        expect(invertedIndex.getIndex('books.json')).toBeDefined();
      });
  });

  describe('Search Index', () => {
    it('Should return correct index of the search term', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, a')).toEqual({
        terms: {
          alice: [1],
          a: [1, 2]
        },
        count: 2
      });
    });
    it('Should return books.json:{} when no result is found',
      () => {
        expect(invertedIndex.searchIndex('books.json', 'along')).toEqual({
          terms: {},
          count: 2
        });
      });
    it('Should return correct index in an array search terms', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, [hole,[a]]')).toEqual({
        terms: {
          alice: [1],
          hole: [1],
          a: [1, 2]
        },
        count: 2
      });
    });
  });
});
