/* eslint-disable no-unused-vars*/
/* eslint-disable no-undef*/
/* eslint-disable no-dupe-keys*/
/* eslint-disable no-multi-assign*/
const invertedIndex = new InvertedIndex();
const books = require('../books.json');
const empty = require('../emptyBook.json');
const invalid = require('../invalidBook.json');
const little = require('../littleBook.json');
describe("Inverted Index", () => {

  /**
   * Test suite to ensure the validateFile method returns an object of
   * the correct index mapping
   */

  describe('Read book data', () => {
    it('Should ensure file content is actually a valid JSON array', () => {
      expect(InvertedIndex.validateFile(books)).toEqual(true);
    });

    it('Should return false for invalid JSON file', () => {
      expect(InvertedIndex.validateFile(invalid)).toEqual(false);
    });

    it('Should ensure that JSON array is not empty', () => {
      expect(InvertedIndex.validateFile(empty)).toEqual(false);
    });
  });

  /*
   * Populate Index Test Suite
   */

  describe('Populate Index', () => {
    invertedIndex.createIndex('books.json', books);


    it('Should ensure that index is created once the file has been read', () => {
      expect(invertedIndex.indices['books.json']).toBeDefined();
    });

    it('Should map the string keys to the correct objects', () => {
      expect(invertedIndex.indices['books.json'].terms.alice).toEqual([1]);
      expect(invertedIndex.indices['books.json'].terms.and).toEqual([1, 2]);
      expect(invertedIndex.indices['books.json'].terms.lord).toEqual([2]);
    });

    invertedIndex.createIndex('littleBook.json', little);
    it('Should return an accurate index of the content of the json file', () => {
      expect(invertedIndex.getIndex('littleBook.json').terms.is).toEqual([1, 2]);
    });

  });

  /**
   * Test suite to ensure the getIndex method returns an object of
   * the correct index mapping
   */

  describe('Get index', () => {
    it('Should return an object when value is found', () => {
      const indexedFile = invertedIndex.getIndex('books.json');
      expect(typeof(indexedFile) === 'object').toBeTruthy();
    });

    it('Should contain valid indexed words and position', () => {
      expect(invertedIndex.getIndex('books.json').terms.alice).toEqual([1]);
      expect(invertedIndex.getIndex('books.json').terms.and).toEqual([1, 2]);
      expect(invertedIndex.getIndex('books.json').terms.lord).toEqual([2]);
    });
  });

  /**
   * Test suite to ensure the tokenizer method returns an object of
   * the correct index mapping
   */
  describe('Tokenizer', () => {
    it('Should return an array when a string is passed', () => {
      expect(InvertedIndex.tokenizer('This is yemi')).toEqual(['this', 'is', 'yemi']);
    });
    it('Should return an array when a recursive array is passed', () => {
      expect(InvertedIndex.tokenizer('books.json', ['a', 'alice'], 'book', 'me'))
        .toEqual(['books', 'json']);
    });
  });

  /**
   * Test suite to ensure the searchIndex method returns an object of
   * the correct index mapping
   */

  describe('Search Index', () => {
    invertedIndex.searchIndex('../books.json', 'alice');
    it('Should return correct index of the search term', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, a')[0]).toEqual({
        terms: {
          alice: [1],
          a: [1, 2]
        },
        count: 2,
        fileName: 'books.json'
      });
    });

    it('Should return books.json:[] when no result is found',
      () => {
        expect(invertedIndex.searchIndex('books.json', 'along')).toEqual(false);
      });

    it('Should return correct index in an array search terms', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, [hole,[a]]')[0]).toEqual({
        terms: {
          alice: [1],
          hole: [1],
          a: [1, 2]
        },
        count: 2,
        fileName: 'books.json'
      });
    });
    it('Should ensure searchIndex can handle a number of varied search terms', () => {
      expect(invertedIndex.searchIndex('littleBook.json', '[is, [ali, book, me, [help, me, out]]]')).toEqual([{
        terms: {
          is: [1, 2],
          ali: [1],
          me: [2]
        },
        count: 2,
        fileName: 'littleBook.json'
      }]);
    });
    it('Should go through all indexed terms if fileName is not passed', () => {
      expect(invertedIndex.searchIndex(null, 'alice, ali')).toEqual([{
        terms: {
          alice: [1]
        },
        count: 2,
        fileName: 'books.json'
      }, {
        terms: {
          ali: [1]
        },
        count: 2,
        fileName: 'littleBook.json'
      }])
    })
  });
});
