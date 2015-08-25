var bookControllers = angular.module('bookAppControllers',[]);

bookControllers.controller('BookListCtrl', ['$scope','$http',
  function($scope, $http){
    $scope.title = '';
    $scope.authorBio;
    $scope.search = function(){
      console.log($('#searchAuthor').val())
      var authorsName = $('#searchAuthor').val()
      $http.get('findAuthorsBooks/' + authorsName)
      .success(function(data){
        console.log(data)
        $scope.authorBio = data.authorBio;
        $scope.authorPic = data.authorBio.large_image_url[0];
        //var stringOfInfluences = $scope.authorBio.influences[0];
        $scope.influencesToAuthor = data.influencesToAuthor
        console.log("This is the array of influences")
        console.log($scope.influencesToAuthor)
        $scope.authorObj = data.authorInfo;
        var allBooks = $scope.authorObj.books[0].book
        var tenBooks = allBooks.slice(0,10)
        render(tenBooks);
        $('.bar').on("mouseover",function(event){
          $scope.displayDescription(event)
          console.log(event.currentTarget.style)
        })
        $scope.bookDesc = tenBooks[0].description[0]
        $('#bookDesc').html($scope.bookDesc)
        $scope.title = tenBooks[0].title[0]
        //$('#bookTitle').html($scope.title)
      })
    };
    $scope.onKeyUp = function($event){
      if($event.keyCode === 13){
        $scope.search();
      }
    }
    $scope.displayDescription = function(event){
      console.log(event.currentTarget.__data__.description[0])
      $scope.bookDesc = event.currentTarget.__data__.description[0]
      $('#bookDesc').html($scope.bookDesc)
      $scope.title = event.currentTarget.__data__.title[0]
      $('#bookTitle').html($scope.title)
    }
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

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

var render = function(data){
  var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1, .3);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")

        $('#svgDocker').empty();
        var svg = d3.select("#svgDocker").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.title[0]; }));
        y.domain([0, 5]);

        svg.append("text")
            .attr("class", "title")
            .attr("x", x(data[0].title[0]))
            .attr("y", -26)
            .text("User Ranking");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll(".tick text")
            .call(wrap, x.rangeBand());

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        console.log(data)
        var highestRating;
        data.forEach(function(d,i){
          if(i === 0){
            console.log('runs')
            highestRating = d
            console.log(d.average_rating[0])
          }else if (highestRating.average_rating[0] < d.average_rating[0]){
            highestRating = d
          }
        })

        console.log(highestRating)
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.title[0]); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.average_rating[0]); })
            .attr("height", function(d) { 
              return height - y(d.average_rating[0]); 
            })

        function wrap(text, width) {
          text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
            }
          });
        }

        function type(d) {
          d.value = +d.value;
          return d;
        } 
}
