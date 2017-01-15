var index = function() {
  var key;
  var word;

  this.objectFiles = {};
  this.invertedIndex = {};

  this.getIndex = function() {
    for (key in file) {
      text = file[key].toLowerCase().replace(/\W+/g, ' ').trim().split(' ');
      for (word = 0; word < text.length; word++) {
        if () {};
      }
    }
    this.createIndex = function(sourceFile) {
      if (sourceFile) {
        var dataValue = this.invertedIndex.getfile(sourceFile);
      }

    }
  }

};
