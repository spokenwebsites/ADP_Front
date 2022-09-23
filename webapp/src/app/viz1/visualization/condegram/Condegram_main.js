var width = 500,
      height = 500,
      start = 0,
      end = 2.25,
      numSpirals = 4
      margin = {top:50,bottom:50,left:50,right:50};

      var valuecount=0;
    var theta = function(r) {
      return numSpirals * Math.PI * r;
    };


    var r = d3.min([width, height]) / 2 - 40;

    var radius = d3.scaleLinear()
      .domain([start, end])
      .range([40, r]);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var points = d3.range(start, end + 0.001, (end - start) / 1000);

    var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

    var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .attr("class","spiral")
      // .style("fill", "none")
      // .style("stroke", "steelblue");



  d3.json("Spiralcondegram_final.json", function (error, data) {
      if (error) throw error;
  var color = d3.scaleOrdinal(d3.schemeCategory10)  
//   var color = d3.scaleSequential(d3.interpolate("Orange","Red"))

  .domain(d3.extent( data,d=> +d["value"]));


    var someData=data;
    var spiralLength = path.node().getTotalLength(),
            
            //N =jsonData.length
            N=550,// this reduce the over lap between
        barWidth = (spiralLength / N) - 1;
     
     
     var parseDate = d3.timeParse("%m-%d-%Y");

     someData.forEach(d=>{d.date = parseDate(d.date);
    })
        

    var timeScale = d3.scaleTime()
      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);
    
    // yScale for the bar height
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(someData, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);

    svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
        
        var linePer = timeScale(d.date),
            posOnLine = path.node().getPointAtLength(linePer),
            angleOnLine = path.node().getPointAtLength(linePer - barWidth);
      
        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral
        
        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      //rgb(255, 127, 14) - peach
      //rgb(44, 160, 44) - green
      //rgb(31, 119, 180) - light blue
      //fil()

      .attr("class",function(d){
            if (d.value>0 && d.value<=3) {
                  return "colorls3"
            } 
            else if(d.value<=6 && d.value>=4)
            {
                  return "colorls6"
            }
            else if(d.value<=10 && d.value>=6 ){
                  return "colorls10"
            }
            else{
                  return "default"
            }
            
      })
      .style("stroke", "none")

      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });
    
     

    // add date labels
    var tF = d3.timeFormat("%b %Y"),
        firstInMonth = {};

    svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .attr("class","spiral_text")
      
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return tF(d.date);
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
     
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


    var tooltip = d3.select("#chart")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div').attr('class', 'date');
    tooltip.append('div').attr('class', 'value');
     
    svg.selectAll("rect")
    .on('mouseover', function(d) {

        tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
        //tooltip.select('.value').html("Value: <b>" + Math.round(d.value*100)/100 + "<b>");
        tooltip.select('.value').html("Value: <b>" + d["value"] + "<b>");
        

        d3.select(this)
        
        .style("fill","#FFFFFF")
        .style("stroke","#323232")
        .style("stroke-width","1px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);
        tooltip.style("visibility","visible");

    })
    .on('mousemove', function(d) {
      

        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function(d) {
        d3.selectAll("rect")
        .style("fill", function(d){return color(d.value);})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    })
    .on('click',function(d){
        console.log(d["date"])
        alert(d["date"]);
      });
});