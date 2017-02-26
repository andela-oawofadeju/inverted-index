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
    vm.titles = [];
    $scope.files = {};
    $scope.fileNames = [];
    $scope.fileSearch = null;
    $scope.allFiles = {};
    $scope.errorFileUploadMessage = false;
    $scope.errorSearchMessage = false;
    $scope.selectedFile = [];
    $scope.indexedFiles = [];
    $scope.indexCreated = false;
    $scope.successfulFileUpload = false;



    vm.create = () => {

      if (Object.keys($scope.files).length === 0) {
        vm.showError('upload');
      } else {
        const fileName = document.getElementById('select-file').value;

        vm.saveTitles($scope.files, fileName);

        $scope.fileSearch = fileName;

        vm.file = fileName;
        vm.indexer.createIndex(fileName, $scope.files[fileName]);

        $scope.indexedFiles.push(fileName);

        vm.indices = [];
        vm.indices[0] = vm.indexer.getIndex(fileName);

        vm.showSearch = false;

        vm.showIndex = true;

        $scope.indexCreated = true;
      }
    };

    vm.showError = (type) => {
      if (type === 'upload') {
        $timeout(() => {
          $scope.errorFileUploadMessage = false;
        }, 3000);
        $scope.errorFileUploadMessage = true;
      } else if (type === 'search') {
        $timeout(() => {
          $scope.errorSearchMessage = false;
        }, 3000);
        $scope.errorSearchMessage = true;
      } else if (type === 'success') {
        $timeout(() => {
          $scope.successfulFileUpload = false;
        }, 3000);
        $scope.successfulFileUpload = true;
      }
    }


    vm.search = (query) => {
      if ($scope.selectedFile.length === 0) {
        vm.showError('search');
      } else {
        if ($scope.selectedFile !== 'allFiles') {
          vm.indices = vm.indexer.searchIndex($scope.selectedFile, query);

          vm.saveTitles($scope.files, $scope.selectedFile);

        } else {
          vm.titles = [];
          vm.indices = vm.indexer.searchIndex(null, query);
        }
        $scope.indexCreated = true ? true : false;
        vm.showSearch = true;
        vm.showIndex = false;
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

    vm.saveTitles = (contents, fileName) => {
      let fileContents = contents[fileName];
      vm.titles = [];
      fileContents.forEach(content => {
        vm.titles.push(content.title);
      });
    };

  }
}());
