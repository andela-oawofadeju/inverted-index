(function() {
  angular.module('InvertedIndex', [])
    .filter('range', () => {
      return (input, number) => {
        for (let i = 1; parseInt(number) >= i; i++) {
          input.push(i);
        }
        return input;
      };
    })
    .controller('InvertedIndexController', Indexer);


  Indexer.$inject = ['$scope'];

  function Indexer($scope) {
    const vm = this;
    vm.title = 'INVERTED-INDEX';
    vm.file = null;
    vm.index = null;
    vm.indexer = new InvertedIndex();
    $scope.files = {};
    $scope.fileNames = [];
    $scope.fileSearch = null;
    $scope.allFiles = {};
    $scope.errorFileUploadMessage = false;
    $scope.errorSearchMessage = false;
    $scope.selectedFile = [];


    vm.create = () => {
      if (Object.keys($scope.files).length === 0) {
        //$scope.errorFileUploadMessage = true;
        vm.showError("upload");
      } else {
        const fileName = document.getElementById('select-file').value;
        $scope.fileSearch = fileName;
        vm.file = fileName;
        vm.indexer.createIndex(fileName, $scope.files[fileName]);
        vm.index = vm.indexer.getIndex(fileName);
        vm.showSearch = false;
        vm.showIndex = true;
      }
    };


    vm.showError = (type) => {
      if (type === "upload") {
        $scope.errorFileUploadMessage = true;
      } else if (type === "search") {
        $scope.errorSearchMessage = true;
      }
    };




    vm.search = (query) => {
      if ($scope.selectedFile.length === 0) {
        vm.showError("search");
      } else {
        let result;
        if ($scope.selectedFile !== 'allFiles') {
          result = vm.indexer.searchIndex($scope.selectedFile, query);
        } else {
          result = vm.indexer.searchIndex(null, query);
        }
        vm.index = result;
        vm.showSearch = true;
        vm.showIndex = false;
      }
    };

    vm.uploadFile = function() {
      for (var i = 0; i < $scope.rawFile.length; i++) {
        const reader = new FileReader();
        const fileName = $scope.rawFile[i]['name'];
        reader.onload = (event) => {
          try {
            $scope.$apply(() => {
              const content = JSON.parse(event.target.result);
              $scope.files[fileName] = content;
              $scope.fileNames.push(fileName);
            });
          } catch (e) {
            return ('An error occured', e.message);
          }
        };
        if ($scope.rawFile[i].type === 'application/json') {
          reader.readAsText($scope.rawFile[i]);
        }
      }
    };

    vm.processFile = (fileName, content) => {
      $scope.$apply(() => {
        vm.file = fileName;
        vm.indexer.createIndex(fileName, content);
        vm.index = vm.indexer.getIndex(fileName);

        vm.count = vm.index.count;
      });
    };
  }
}());
