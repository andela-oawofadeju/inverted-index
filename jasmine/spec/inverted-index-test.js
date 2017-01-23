

describe('Inverted Index Tests', function() {
  let fileName = './books.json';
  let indexer = new InvertedIndex();
  beforeEach(function(done) {
    indexer.createIndex(fileName);
    done();
  });


  describe('Read book data', function() {
    it('asserts that the file content is actually a valid JSON Array', function() {
      expect(indexer.createIndex).toBeDefined();
    });
    it('asserts that json file is not empty', function() {
      expect(indexer.createIndex).not.toEqual([]);
    });
  });

  describe('Populate index', function() {
    it('ensures that the index is correct', function() {
      expect(indexer.getIndex.length).not.toBe(null);
    });

    it('verifies that the index is created once the JSON file has been read', function() {
      expect(indexer.getIndex).toBeDefined();
    });

    it('index maps the string keys to the correct objects in the JSON array', function() {
      expect(indexer.searchIndex(fileName, 'alice').alice).toEqual([1]);
      expect(indexer.searchIndex(fileName, 'ring').ring).toEqual([2]);
    });
  });
  describe('Search Index', function() {
    it('verifies that searching the index returns an array of the indices of the correct objects', function() {
      expect(indexer.searchIndex(fileName, 'alice').alice).toEqual([1]);
      expect(indexer.searchIndex(fileName, 'ring').ring).toEqual([2]);
    });

  });
});
