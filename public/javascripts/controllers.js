var bookControllers = angular.module('bookAppControllers',[]);

bookControllers.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $http.get('books.json').success(function(data){
      $scope.books = data;
    });
    $scope.orderProp = 'age';
}]);

bookControllers.controller('BookDetailCtrl', ['$scope','$routeParams',
  function($scope, $routeParams){
    $scope.phoneId = $routeParams.phoneId
  }
]);