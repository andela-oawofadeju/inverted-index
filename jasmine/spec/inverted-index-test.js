describe('Inverted Index Tests', function() {
  var invertedIndex = new Index();
  var sourceFile = './books.json';
  var filePath;

  beforeEach(function(done) {
    invertedIndex.createIndex(sourceFile).done(function(data) {
      invertedIndex.parsedJSON = data;
      filePath = invertedIndex.getFile(sourceFile);

      //invoke jasmine's done callback
      done();
    });
  });

  describe('Read book data', function() {
    it('asserts that json file is not empty', function() {
      expect(invertedIndex.content).not.toEqual([]);
    });
  });

  describe('Populate index', function() {
    it('verifies that the index is created once the JSON file has been read', function() {
      expect(invertedIndex.readIndex).toBeDefined();
      expect(invertedIndex.readIndex.length).not.toBe(null);
    });

    it('index maps the string keys to the correct objects in the JSON array', function() {
      expect(invertedIndex.index.alice).toEqual([]);
      expect(invertedIndex.index.ring).toEqual([]);
    });
  });
  describe('Search Index', function() {
    it('verifies that searching the index returns an array of the indices of the correct objects', function() {
      expect(invertedIndex.searchIndex('alice').alice).toEqual([]);
      expect(invertedIndex.searchIndex('rings').ring).toEqual([]);
    });
  });
});
