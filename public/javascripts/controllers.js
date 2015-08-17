var bookControllers = angular.module('bookAppControllers',[]);

bookControllers.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $http.get('books.json').success(function(data){
      $scope.books = data;
    });
    $scope.orderProp = 'age';
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
  ['$scope','$routeParams','$http'],
  function($scope, $routeParams, $http){
    .success(function(data){
      $scope.books = data;
    })
  }

  )