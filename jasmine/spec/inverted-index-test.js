/* eslint-disable no-unused-vars*/
/* eslint-disable no-undef*/
/* eslint-disable no-dupe-keys*/
/* eslint-disable no-multi-assign*/
const invertedIndex = new InvertedIndex();
const books = require('../books.json');
const empty = require('../emptyBook.json');
const invalid = require('../invalidBook.json');
const little = require('../littleBook.json');

describe('Inverted Index', () => {
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

  describe('Populate Index', () => {
    invertedIndex.createIndex('books.json', books);


    it('Should ensure that index is created once file has been read', () => {
      expect(invertedIndex.indices['books.json']).toBeDefined();
    });

    it('Should map the string keys to the correct objects', () => {
      expect(invertedIndex.indices['books.json'].terms.alice).toEqual([1]);
      expect(invertedIndex.indices['books.json'].terms.and).toEqual([1, 2]);
      expect(invertedIndex.indices['books.json'].terms.lord).toEqual([2]);
      expect(invertedIndex.indices['books.json'].terms.lord).not.toEqual([1]);
      expect(invertedIndex.indices['books.json'].terms.alice).not.toEqual([2]);
    });
    invertedIndex.createIndex('littleBook.json', little);
    it('Should return correct indices of JSON file contents', () => {
      expect(invertedIndex.indices['littleBook.json'].terms).toEqual({
        ali: [1],
        is: [1, 2],
        human: [1],
        deliver: [2],
        me: [2],
        this: [2],
        progress: [2] });
    });
    it('Should return an accurate index of json file content', () => {
      expect(invertedIndex.getIndex('littleBook.json').terms.is)
        .toEqual([1, 2]);
    });
  });

  describe('Get index', () => {
    it('Should return an object when value is found', () => {
      const indexedFile = invertedIndex.getIndex('books.json');
      expect(typeof indexedFile === 'object').toBeTruthy();
    });

    it('Should contain valid indexed words and position', () => {
      expect(invertedIndex.getIndex('books.json').terms.alice).toEqual([1]);
      expect(invertedIndex.getIndex('books.json').terms.and).toEqual([1, 2]);
      expect(invertedIndex.getIndex('books.json').terms.lord).toEqual([2]);
    });
    invertedIndex.createIndex('littleBook.json', little);
    it('Should return correct indices of JSON file contents', () => {
      expect(invertedIndex.getIndex('littleBook.json').terms).toEqual({
        ali: [1],
        is: [1, 2],
        human: [1],
        deliver: [2],
        me: [2],
        this: [2],
        progress: [2] });
    });
  });

  describe('Tokenizer', () => {
    it('Should return an array when a string is passed', () => {
      expect(InvertedIndex.tokenizer('This is yemi'))
        .toEqual(['this', 'is', 'yemi']);
    });

    it('Should return an array when an array is passed', () => {
      expect(InvertedIndex.tokenizer(['testing#%', 'for*%$', 'array#@%']))
        .toEqual(['testing', 'for', 'array']);
    });

    it('Should return an array for strings with special characters', () => {
      expect(InvertedIndex.tokenizer('$#@ this&#@ is*&% testing'))
      .toEqual(['this', 'is', 'testing']);
    });

    it('Should return an array for strings with white spaces', () => {
      expect(InvertedIndex.tokenizer('    these     are    lots  of  spaces '))
  .toEqual(['these', 'are', 'lots', 'of', 'spaces']);
    });

    it('Should return an array for strings with uppercases', () => {
      expect(InvertedIndex.tokenizer('    theSe aRe lOtS oF cAsEs   '))
  .toEqual(['these', 'are', 'lots', 'of', 'cases']);
    });
  });

  describe('Search Index', () => {
    invertedIndex.searchIndex('books.json', 'alice');
    it('Should return correct result of the search term', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, a')[0]).toEqual({
        terms: {
          alice: [1],
          a: [1, 2]
        },
        count: 2,
        fileName: 'books.json'
      });
    });

    it('Should return correct index in an array search terms', () => {
      expect(invertedIndex
      .searchIndex('books.json', ['alice', 'a', 'hole', 'lord']))
        .toEqual([{
          terms: {
            alice: [1],
            hole: [1],
            a: [1, 2],
            lord: [2]
          },
          count: 2,
          fileName: 'books.json'
        }]);
    });

    it('Should ensure searchIndex handles varied terms as arguments', () => {
      expect(invertedIndex
          .searchIndex('littleBook.json', 'is'))
        .toEqual([{
          terms: {
            is: [1, 2],
          },
          count: 2,
          fileName: 'littleBook.json'
        }]);

      expect(invertedIndex
          .searchIndex('littleBook.json', 'is', 'progress', 'this', 'ali'))
        .toEqual([{
          terms: {
            is: [1, 2],
            progress: [2],
            this: [2],
            ali: [1]
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
      }]);
    });
  });
});
