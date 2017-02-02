angular.module('InvertedIndex')
  .directive('fileUpload', ['$parse', function($parse) {
    return {
      restrict: 'A',
      controller: 'InvertedIndexController',
      link: function(scope, element, attrs) {
        let model = $parse(attrs.fileUpload);
        let modelSetter = model.assign;

        scope.rawFile;
        element.bind('change', function() {
          scope.$apply(function() {
            scope.rawFile = element[0].files;
            console.log(element[0].files);
            for (var i = 0; i < scope.rawFile.length; i++) {
              const reader = new FileReader();
              const fileName = scope.rawFile[i]['name'];
              reader.onload = (event) => {
                try {
                  scope.$apply(() => {
                    const content = JSON.parse(event.target.result);
                    scope.indexer.indexer.allBooks = scope.indexer.indexer.allBooks.concat(content);
                    scope.files[fileName] = content;
                    scope.fileNames.push(fileName);
                  });
                } catch (e) {
                  console.log('An error occured', e.message);
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
