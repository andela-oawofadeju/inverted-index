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
          });
        });
      }
    };
  }]);
