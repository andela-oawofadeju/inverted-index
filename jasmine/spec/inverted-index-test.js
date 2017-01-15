describe('Inverted Index Tests', function() {
  var invertedIndex = new Index();
  var sourceFile = './books.json';

  beforeEach(function(done) {
    invertedIndex.createIndex('', function() {
      done();
    });
  });

  describe('Read book data', function() {
    it('asserts that json file is not empty', function() {
      expect(invertedIndex.content).not.toEqual([]);
    });
  });



});
