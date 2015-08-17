var bookControllers = angular.module('bookAppControllers',[]);

bookControllers.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $http.get('books.json').success(function(data){
      $scope.books = data;
    });
    $scope.orderProp = 'age';
    $scope.search = function(){
      console.log($('#searchAuthor').val())
      var authorsName = $('#searchAuthor').val()
      $http.get('findAuthorsBooks/' + authorsName)
      .success(function(data){
        $scope.books = data;
      })
    };

}]);

bookControllers.controller('BookDetailCtrl', 
  ['$scope','$routeParams', '$http',
  function($scope, $routeParams, $http){
    $http.get('books/' + $routeParams.bookId + '.json')
      .success(function(data){
        $scope.book = data;
      })
  }
]);

bookControllers.controller('AbeBooksCtrl',
  ['$scope','$routeParams','$http',
  function($scope, $routeParams, $http){
    $http.get('findAuthorsBooks/')
      .success(function(data){
        $scope.books = data;
      })
  }
]);