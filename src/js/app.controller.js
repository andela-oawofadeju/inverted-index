(function() {
  angular.module('InvertedIndex')
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
    vm.eggroll = null;
    vm.index = null;
    vm.indexer = new InvertedIndex();
    $scope.files = {};
    $scope.fileNames = [];
    $scope.fileSearch = null;

    vm.create = () => {
      let result = vm.indexer.test();
      alert(result);
    };

    vm.create = (fileName) => {
      $scope.fileSearch = fileName;
      console.log(fileName);
      console.log($scope.files[fileName]);
      vm.indexer.createIndex(fileName, $scope.files[fileName]);
      vm.index = vm.indexer.getIndex(fileName);
      console.log(vm.index);
    };

    vm.search = () => {
      const query = document.getElementById('search').value;
      console.log(vm.file, query);
      const result = vm.indexer.searchIndex($scope.fileSearch, query);
      console.log(result);
      vm.index = result;
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
            console.log('An error occured', e.message);
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
        console.log(vm.index);
        vm.count = vm.index.count;
      });
    };
  }
}());
