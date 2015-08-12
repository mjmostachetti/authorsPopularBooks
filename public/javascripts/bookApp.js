var data = [4,8,15,16,23,42]

var width = 420,
  barheight = 20;

var x = d3.scale.linear()
  .domain([0,d3.max(data)])
  .range([0,420]);

var chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", barHeight * data.length)

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style("width", function(d){ 
      console.log(x(d) + "px")
      return x(d) + "px"})
    .text(function(d){ return d; });