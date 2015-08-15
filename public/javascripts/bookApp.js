var bookApp = angular.module('bookApp', [])

bookApp.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $scope.name = "World";
    $http.get('books.json').success(function(data){
      $scope.books = data;
    });
    $scope.orderProp = 'age';
}])