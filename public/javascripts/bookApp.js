var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookAppControllers'
]);

bookApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/books',{
        templateUrl: 'partials/listOfBooks',
        controller: 'BookListCtrl'
      }).
      when('/books/:bookId',{
        templateUrl : 'partials/book-detail',
        controller : 'BookDetailCtrl'
      }).
      otherwise({
        redirectTo: '/books'
      })
  }
]);
