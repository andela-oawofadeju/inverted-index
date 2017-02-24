const invertedIndex = new InvertedIndex();
describe("Inverted Index", () => {


  beforeEach(() => {
    invertedIndex.createIndex('books.json', validBook);
  });
  /**
   * Test suite to ensure the validateFile method returns an object of
   * the correct index mapping
   */
  // this is test suite
  describe('Read book data', () => {
    beforeEach(() => {
      invertedIndex.validateFile('books.json', validBook);
    });
    it('Should return false for empty json array', () => {
      expect(invertedIndex.validateFile(emptyBook)).toEqual(false);
    });

    it('Should return true for valid json file', () => {
      expect(invertedIndex.validateFile(validBook)).toEqual(true);
    });

    it('Should return false if json does not contain title and text', () => {
      expect(invertedIndex.validateFile(invalidBook)).toEqual(false);
    });
  });

  describe('Populate Index', () => {
    beforeEach(() => {
      invertedIndex.getIndex('books.json', validBook);
    });
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


  /**
   * Test suite to ensure the searchIndex method returns an object of
   * the correct index mapping
   */

  describe('Get index', () => {
    beforeEach(() => {
      invertedIndex.getIndex('books.json', validBook);
    });
    it('should return an object when value is found', () => {
      const indexedFile = invertedIndex.getIndex('books.json');
      expect(typeof(indexedFile) === 'object').toBeTruthy();
    });

    it('should contain valid indexed words and position', () => {
      expect(invertedIndex.getIndex('books.json').terms.alice).toBeTruthy();
    });
  });

  /**
   * Test suite to ensure the searchIndex method returns an object of
   * the correct index mapping
   */

  describe('Search Index', () => {
    beforeEach(() => {
      invertedIndex.searchIndex('books.json', validBook);
    });
    it('Should return correct index of the search term', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, a')[0]).toEqual({
        terms: {
          alice: [1],
          a: [1, 2]
        },
        count: 2,
        filePath: 'books.json'

      });
    });

    it('Should return books.json:[] when no result is found',
      () => {
        expect(invertedIndex.searchIndex('books.json', 'along')).toEqual([]);
      });

    it('Should return correct index in an array search terms', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, [hole,[a]]')[0]).toEqual({
        terms: {
          alice: [1],
          hole: [1],
          a: [1, 2]
        },
        count: 2,
        filePath: 'books.json'
      });
    });
  });
});
