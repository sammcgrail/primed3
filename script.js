var data = [
  [1,7,2,3.2,4,3,1,8,4,7],
  [5,2,7,2,1,6,3,1,2,6]
];
    
var dateBasis = new Date();

var timeFormat = d3.time.format("%b %d");

function daysAfter(dateBasis, n) {
  return new Date(dateBasis.getUTCFullYear(), dateBasis.getUTCMonth(), dateBasis.getUTCDate() + n);
}

var dimensions = [640, 240],
    padding = [20, 40, 25, 40],
    plotDims = [ dimensions[0] - padding[1] - padding[3], dimensions[1] - padding[0] - padding[2] ];

function size(sel, dims) {
  sel.attr('width', dims[0])
     .attr('height', dims[1])
     .attr('viewBox', [0,0,dimensions[0],dimensions[1]].join(' '));
}

var svg = d3.select("body").append("svg")
    .call(size, dimensions)
    .append("g")
    .call(size, plotDims)
    .attr("transform", "translate(" + padding[3] + ',' + padding[0] + ")");

var xScale = d3.time.scale()
    .domain([dateBasis, daysAfter(dateBasis, data[0].length)])
    .range([0, plotDims[0]]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(data[0])])
    .range([plotDims[1], 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(timeFormat)
    .orient('bottom')

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')

svg.append('g')
  .attr('class', 'axis')
  .call(xAxis)
  .attr('transform', 'translate(0,' + plotDims[1] + ')')

svg.append('g')
  .attr('class', 'axis')
  .call(yAxis);

function x(d, i) {
  return xScale(daysAfter(dateBasis, i+1));
}

function y(d, i) {
  return yScale(d);
}

var line = d3.svg.line().x(x).y(y);


svg.selectAll('.plot').data(data).enter()
  .append('g')
    .attr('class', 'plot')
    .append('path')
      .attr('class', 'series')
      .attr('d', function(d) { return line(d); })

