var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookAppControllers',
  'bookAppFilters'
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
      })
      .when('/abeBooks',{
        templateUrl: 'partials/abeBooksSearch',
        controller : 'AbeBooksCtrl'
      })
      .otherwise({
        redirectTo: '/books'
      })
  }
]);
