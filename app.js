var margin = { top: 20, right: 10, bottom:100, left:40},
    width = 700 - margin.right - margin.left;
    height = 500 - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr({
      "width": width + margin.right + margin.left, 
      "height" : height + margin.top + margin.bottom
  })
  .append('g')
    .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

//define x and y scales
var xScale = d3.scale.ordinal()
 .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
 .range([height, 0]);

// defining axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//load file
d3.csv("crimeData.csv", function(error, data){
   if (error) console.log("Error: data not loaded");
    console.log(data[0]);


    data.forEach(function(d){
        d["Count of UCR Literal"] = +d["Count of UCR Literal"]
        d["Row Labels"] = d["Row Labels"];
       console.log(d)
    });

    data.sort(function(a,b) {
        return b["Count of UCR Literal"]
    })

//spceify domains of x and y
xScale.domain(data.map(function(d) {return (d["Row Labels"]);}) );
yScale.domain([0, 100000]);
    /*d3.max(data, function(d) {return d["Count of UCR Literal"];}) ] );*/

//bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y" , height)
    .transition().duration(3000)
    .delay(function(d,i) {return i + 200;} )
    .attr({
        "x": function(d) { return xScale (d["Row Labels"]); },
        "y": function(d) { return yScale (d["Count of UCR Literal"]); },
        "width": xScale.rangeBand(),
        "height": function(d){ return height - yScale (d["Count of UCR Literal"]); }
});
    
    

//bar labeling
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {return (d["Count of UCR Literal"])})
    .attr('x', function(d) {return xScale(d["Row Labels"]); })
    .attr('y', function(d) {return yScale(d["Count of UCR Literal"]) - 13; });


// make x axis

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-60)")
    .attr("dx", "-.8em")
    .attr("dy", ".25em")
    .style("text-anchor", "end")
    .style("font-size", "9px");

// make y axis
svg.append("g")
    .attr("class", " y axis")
    .call(yAxis)
    .style("font-size", "9px");
    

//let crime_type = ['AGG ASSAULT', 'AUTO THEFT', 'BURGLARY-NONRES', 'BURGLARY-RESIDENCE', 'HOMICIDE', 'LARCENY-FROM VEHICLE', 'LARCENY-NON VEHICLE', 'MANSLAUGHTER', 'ROBBERY-COMMERCIAL', 'ROBBERY-PEDESTRIAN', 'ROBBERY-RESIDENCE']
//text ='';

//for (var i=0;i<data.keys(d).length; i++) {
    //myObj[ data.keys(d)[i] ] = +data.values(d)[i];
  //}
  //return myObj;



//data.forEach (function (row){ 
    //console.log(row)
    //console.log(row['UCR Literal'])



// for  (i=0; i < (crimeData.length); i++) {
 //   text = crimeData[i]['UCR Literal']);

//   var count; 
//   data.forEach(function(d){
      //d["Count of UCR Literal"] = +d["Count of UCR Literal"]
      //d["Row Labels"] = d["Row Labels"];
     //console.log(d)
// })

});  
