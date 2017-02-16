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


  Indexer.$inject = ['$scope', '$timeout'];

  function Indexer($scope, $timeout) {
    const vm = this;
    vm.title = 'INVERTED-INDEX';
    vm.file = null;
    vm.indices = [];
    vm.indexer = new InvertedIndex();
    $scope.files = {};
    $scope.fileNames = [];
    $scope.fileSearch = null;
    $scope.allFiles = {};
    $scope.errorFileUploadMessage = false;
    $scope.errorSearchMessage = false;
    $scope.selectedFile = [];
    $scope.indexedFiles = [];
    $scope.indexCreated = false;


    vm.create = () => {
      if (Object.keys($scope.files).length === 0) {
        //$scope.errorFileUploadMessage = true;
        vm.showError("upload");
      } else {
        const fileName = document.getElementById('select-file').value;
        $scope.fileSearch = fileName;
        vm.file = fileName;
        vm.indexer.createIndex(fileName, $scope.files[fileName]);
        console.log(vm.indexer.getIndex(fileName))
        vm.indices[0] = vm.indexer.getIndex(fileName);

        vm.showSearch = false;
        vm.showIndex = true;
        $scope.indexCreated = true;
      }
    };


    vm.showError = (type) => {
      if (type === "upload") {
        $timeout(() => {
          $scope.errorFileUploadMessage = false;
        }, 3000);
        $scope.errorFileUploadMessage = true;
      } else if (type === "search") {
        $timeout(() => {
          $scope.errorSearchMessage = false;
        }, 3000);
        $scope.errorSearchMessage = true;
      }
    };




    vm.search = (query) => {
      if ($scope.selectedFile.length === 0) {
        vm.showError("search");
      } else {
        let result
        if ($scope.selectedFile !== 'allFiles') {
          console.log($scope.selectedFile)
          vm.indices = vm.indexer.searchIndex($scope.selectedFile, query);
          console.log(vm.indices);

        } else {
          console.log(query, 'ngghjh');
          vm.indices = vm.indexer.searchIndex(null, query);
        }
        $scope.indexCreated = true ? true : false;
        // vm.indices.push(result);
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
