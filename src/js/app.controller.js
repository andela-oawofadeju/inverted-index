(function() {
  angular.module('InvertedIndex')
    .filter('range', () => {
      return (input, number) => {
        for (let i = 1; parseInt(number) >= i; i++) {
          input.push(i);
        }
        console.log(input);
        return input;
      };
    })
    .controller('InvertedIndexController', Indexer);


  Indexer.$inject = ['$scope'];

  function Indexer($scope) {
    const vm = this;
    vm.title = 'Indexer Checkpoint Project';
    vm.file = null;
    vm.index = null;
    vm.indexer = new InvertedIndex();
    vm.create = () => {
      let result = vm.indexer.test();
      alert(result);
    };

    vm.fileUpload = () => {
      vm.indexer.createIndex('books');
      let result = vm.indexer.getIndex();
      alert(result);
    };

    vm.search = () => {

      const query = document.getElementById('search').value;
      console.log(vm.file, query);
      const result = vm.indexer.searchIndex(vm.file, query);
      console.log(result);
      vm.index = result;
    };

    vm.uploadFile = function() {
      let file = $scope.file;
      console.log(file);
      const reader = new FileReader();
      //event fired when reader.readAsTex is called
      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result);
          // $scope.$apply(() => {
          vm.processFile(file.name, content);
          // });
        } catch (e) {
          console.log('An error occured', e.message);
        }
      };
      reader.readAsText(file);
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
