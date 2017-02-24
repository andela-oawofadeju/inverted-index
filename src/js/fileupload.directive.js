angular.module('InvertedIndex')
  .directive('fileUpload', ['$parse', function() {
    return {
      restrict: 'A',
      controller: 'InvertedIndexController',
      link: function(scope, element) {
        scope.rawFile;
        element.bind('change', function() {
          scope.$apply(function() {
            scope.rawFile = element[0].files;

            for (var i = 0; i < scope.rawFile.length; i++) {
              const reader = new FileReader();
              const fileName = scope.rawFile[i]['name'];
              reader.onload = (event) => {
                try {
                  scope.$apply(() => {
                    const content = JSON.parse(event.target.result);

                    isValid = scope.indexer.indexer.validateFile(content);

                    if (isValid) {
                      scope.indexer.indexer.allBooks = scope.indexer.indexer.allBooks.concat(content);
                      scope.files[fileName] = content;
                      scope.fileNames.push(fileName);

                      scope.indexer.showError('success');

                    } else {
                      scope.indexer.showError('upload');
                    }

                  });
                } catch (e) {
                  return ('An error occured', e.message);
                }

                scope.indexer.indexer.createIndex();
              };
              if (scope.rawFile[i].type === 'application/json') {
                reader.readAsText(scope.rawFile[i]);
              }
            }
          });
        });
      }
    };
  }]);
