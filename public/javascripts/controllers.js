var bookControllers = angular.module('bookAppControllers',[]);

bookControllers.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $http.get('books.json').success(function(data){
      $scope.books = data;
    });
    $scope.orderProp = 'age';
    $scope.search = function(){
      $('#svgDocker').empty();
      console.log($('#searchAuthor').val())
      var authorsName = $('#searchAuthor').val()
      $http.get('findAuthorsBooks/' + authorsName)
      .success(function(data){
        $scope.authorObj = data;
        console.log($scope.authorObj.books[0].book)

        var linearScale = d3.scale.linear()
          .domain([0,5])
          .range([0,500])
        var svgContainer = d3.select('#svgDocker').append('svg')
          .attr('width',500)
          .attr('height',500)
        var circles = svgContainer.selectAll('circle')
          .data($scope.authorObj.books[0].book)
          .enter()
          .append('circle')
        var circleAttributes = circles
          .attr('cx',function(d){ 
            return linearScale(parseFloat(d.average_rating[0],10));
          })
          .attr('cy',function(d){ 
            return linearScale(parseFloat(d.average_rating[0],10));
          })
          .attr('r',5)
          .text(function(d){return d.title[0]})
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