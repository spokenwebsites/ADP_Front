function get_condegram_json(condegram_json){


var width = 600,
      height = 600,
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

//       var json_data=[
//         {
//               "date": "08-06-2020",
//               "value": 2
//         },
//         {
//               "date": "04-14-2020",
//               "value": 1
//         },
//         {
//               "date": "04-28-2020",
//               "value": 4
//         },
//         {
//               "date": "09-03-2020",
//               "value": 3
//         },
//         {
//               "date": "10-07-2020",
//               "value": 1
//         },
//         {
//               "date": "10-13-2020",
//               "value": 4
//         },
//         {
//               "date": "04-20-2021",
//               "value": 4
//         },
//         {
//               "date": "05-20-2020",
//               "value": 3
//         },
//         {
//               "date": "06-17-2020",
//               "value": 2
//         },
//         {
//               "date": "07-15-2020",
//               "value": 2
//         },
//         {
//               "date": "08-19-2020",
//               "value": 2
//         },
//         {
//               "date": "07-21-2020",
//               "value": 1
//         },
//         {
//               "date": "08-27-2020",
//               "value": 3
//         },
//         {
//               "date": "09-17-2020",
//               "value": 3
//         },
//         {
//               "date": "06-19-2020",
//               "value": 2
//         },
//         {
//               "date": "09-16-2020",
//               "value": 4
//         },
//         {
//               "date": "10-08-2020",
//               "value": 5
//         },
//         {
//               "date": "06-18-2020",
//               "value": 4
//         },
//         {
//               "date": "09-24-2020",
//               "value": 12
//         },
//         {
//               "date": "10-01-2020",
//               "value": 6
//         },
//         {
//               "date": "09-08-2020",
//               "value": 2
//         },
//         {
//               "date": "03-23-2020",
//               "value": 1
//         },
//         {
//               "date": "05-26-2020",
//               "value": 4
//         },
//         {
//               "date": "06-23-2020",
//               "value": 1
//         },
//         {
//               "date": "08-25-2020",
//               "value": 2
//         },
//         {
//               "date": "09-29-2020",
//               "value": 2
//         },
//         {
//               "date": "10-27-2020",
//               "value": 16
//         },
//         {
//               "date": "11-24-2020",
//               "value": 4
//         },
//         {
//               "date": "12-29-2020",
//               "value": 2
//         },
//         {
//               "date": "01-26-2021",
//               "value": 5
//         },
//         {
//               "date": "02-23-2021",
//               "value": 2
//         },
//         {
//               "date": "03-23-2021",
//               "value": 2
//         },
//         {
//               "date": "05-18-2021",
//               "value": 3
//         },
//         {
//               "date": "06-15-2021",
//               "value": 3
//         },
//         {
//               "date": "10-16-2020",
//               "value": 2
//         },
//         {
//               "date": "10-22-2020",
//               "value": 14
//         },
//         {
//               "date": "10-29-2020",
//               "value": 18
//         },
//         {
//               "date": "11-05-2020",
//               "value": 2
//         },
//         {
//               "date": "11-19-2020",
//               "value": 4
//         },
//         {
//               "date": "11-20-2020",
//               "value": 4
//         },
//         {
//               "date": "03-29-2020",
//               "value": 1
//         },
//         {
//               "date": "04-19-2021",
//               "value": 2
//         },
//         {
//               "date": "05-19-2020",
//               "value": 2
//         },
//         {
//               "date": "06-21-2020",
//               "value": 1
//         },
//         {
//               "date": "08-23-2020",
//               "value": 1
//         },
//         {
//               "date": "09-20-2020",
//               "value": 7
//         },
//         {
//               "date": "10-18-2020",
//               "value": 1
//         },
//         {
//               "date": "12-10-2020",
//               "value": 3
//         },
//         {
//               "date": "11-15-2020",
//               "value": 6
//         },
//         {
//               "date": "12-13-2020",
//               "value": 1
//         },
//         {
//               "date": "12-12-2020",
//               "value": 3
//         },
//         {
//               "date": "02-21-2021",
//               "value": 1
//         },
//         {
//               "date": "12-17-2020",
//               "value": 2
//         },
//         {
//               "date": "03-21-2021",
//               "value": 1
//         },
//         {
//               "date": "04-18-2021",
//               "value": 1
//         },
//         {
//               "date": "05-23-2021",
//               "value": 2
//         },
//         {
//               "date": "07-26-2020",
//               "value": 1
//         },
//         {
//               "date": "04-22-2020",
//               "value": 3
//         },
//         {
//               "date": "04-29-2020",
//               "value": 1
//         },
//         {
//               "date": "05-13-2020",
//               "value": 1
//         },
//         {
//               "date": "11-23-2020",
//               "value": 1
//         },
//         {
//               "date": "04-26-2021",
//               "value": 2
//         },
//         {
//               "date": "05-19-2021",
//               "value": 2
//         },
//         {
//               "date": "06-01-2021",
//               "value": 1
//         },
//         {
//               "date": "09-11-2020",
//               "value": 3
//         },
//         {
//               "date": "10-28-2020",
//               "value": 16
//         },
//         {
//               "date": "03-19-2021",
//               "value": 2
//         },
//         {
//               "date": "05-13-2021",
//               "value": 6
//         },
//         {
//               "date": "06-03-2021",
//               "value": 3
//         },
//         {
//               "date": "06-28-2021",
//               "value": 2
//         },
//         {
//               "date": "12-11-2020",
//               "value": 2
//         },
//         {
//               "date": "04-16-2021",
//               "value": 3
//         },
//         {
//               "date": "06-24-2020",
//               "value": 2
//         },
//         {
//               "date": "02-14-2021",
//               "value": 1
//         },
//         {
//               "date": "06-12-2021",
//               "value": 2
//         },
//         {
//               "date": "11-11-2020",
//               "value": 4
//         },
//         {
//               "date": "03-27-2021",
//               "value": 1
//         },
//         {
//               "date": "03-11-2021",
//               "value": 2
//         },
//         {
//               "date": "06-22-2021",
//               "value": 2
//         },
//         {
//               "date": "10-30-2020",
//               "value": 11
//         },
//         {
//               "date": "11-06-2020",
//               "value": 3
//         },
//         {
//               "date": "11-07-2020",
//               "value": 4
//         },
//         {
//               "date": "11-08-2020",
//               "value": 5
//         },
//         {
//               "date": "11-10-2020",
//               "value": 4
//         },
//         {
//               "date": "11-13-2020",
//               "value": 4
//         },
//         {
//               "date": "11-14-2020",
//               "value": 5
//         },
//         {
//               "date": "11-22-2020",
//               "value": 5
//         },
//         {
//               "date": "11-16-2020",
//               "value": 3
//         },
//         {
//               "date": "11-21-2020",
//               "value": 4
//         },
//         {
//               "date": "01-14-2021",
//               "value": 1
//         },
//         {
//               "date": "01-15-2021",
//               "value": 3
//         },
//         {
//               "date": "01-21-2021",
//               "value": 1
//         },
//         {
//               "date": "01-28-2021",
//               "value": 1
//         },
//         {
//               "date": "02-04-2021",
//               "value": 2
//         },
//         {
//               "date": "03-04-2021",
//               "value": 3
//         },
//         {
//               "date": "06-10-2020",
//               "value": 1
//         },
//         {
//               "date": "10-15-2020",
//               "value": 5
//         },
//         {
//               "date": "11-12-2020",
//               "value": 6
//         },
//         {
//               "date": "12-05-2020",
//               "value": 1
//         },
//         {
//               "date": "03-18-2021",
//               "value": 5
//         },
//         {
//               "date": "04-29-2021",
//               "value": 2
//         },
//         {
//               "date": "06-24-2021",
//               "value": 1
//         },
//         {
//               "date": "05-08-2021",
//               "value": 1
//         },
//         {
//               "date": "05-12-2021",
//               "value": 2
//         },
//         {
//               "date": "05-20-2021",
//               "value": 3
//         },
//         {
//               "date": "05-26-2021",
//               "value": 2
//         },
//         {
//               "date": "04-19-2020",
//               "value": 1
//         },
//         {
//               "date": "04-23-2020",
//               "value": 2
//         },
//         {
//               "date": "04-30-2020",
//               "value": 2
//         },
//         {
//               "date": "09-22-2020",
//               "value": 6
//         },
//         {
//               "date": "09-30-2020",
//               "value": 2
//         },
//         {
//               "date": "03-25-2021",
//               "value": 2
//         },
//         {
//               "date": "04-08-2021",
//               "value": 3
//         },
//         {
//               "date": "04-15-2021",
//               "value": 1
//         },
//         {
//               "date": "04-22-2021",
//               "value": 1
//         },
//         {
//               "date": "05-28-2021",
//               "value": 3
//         },
//         {
//               "date": "06-17-2021",
//               "value": 1
//         },
//         {
//               "date": "07-08-2021",
//               "value": 2
//         },
//         {
//               "date": "04-13-2021",
//               "value": 4
//         },
//         {
//               "date": "05-29-2021",
//               "value": 2
//         },
//         {
//               "date": "11-09-2020",
//               "value": 2
//         },
//         {
//               "date": "11-17-2020",
//               "value": 3
//         },
//         {
//               "date": "11-18-2020",
//               "value": 3
//         },
//         {
//               "date": "12-03-2020",
//               "value": 2
//         },
//         {
//               "date": "02-09-2021",
//               "value": 3
//         },
//         {
//               "date": "03-02-2021",
//               "value": 1
//         },
//         {
//               "date": "03-16-2021",
//               "value": 2
//         },
//         {
//               "date": "03-30-2021",
//               "value": 2
//         },
//         {
//               "date": "07-15-2021",
//               "value": 1
//         },
//         {
//               "date": "11-28-2020",
//               "value": 1
//         },
//         {
//               "date": "05-21-2021",
//               "value": 2
//         },
//         {
//               "date": "06-07-2020",
//               "value": 1
//         },
//         {
//               "date": "07-23-2020",
//               "value": 2
//         },
//         {
//               "date": "07-29-2020",
//               "value": 3
//         },
//         {
//               "date": "07-30-2020",
//               "value": 1
//         },
//         {
//               "date": "08-18-2020",
//               "value": 2
//         },
//         {
//               "date": "09-09-2020",
//               "value": 3
//         },
//         {
//               "date": "11-04-2020",
//               "value": 2
//         },
//         {
//               "date": "11-27-2020",
//               "value": 5
//         },
//         {
//               "date": "07-11-2021",
//               "value": 1
//         },
//         {
//               "date": "07-20-2021",
//               "value": 1
//         },
//         {
//               "date": "06-27-2020",
//               "value": 1
//         },
//         {
//               "date": "05-15-2021",
//               "value": 4
//         },
//         {
//               "date": "04-01-2020",
//               "value": 1
//         },
//         {
//               "date": "02-10-2021",
//               "value": 2
//         },
//         {
//               "date": "03-24-2021",
//               "value": 1
//         },
//         {
//               "date": "05-22-2020",
//               "value": 1
//         },
//         {
//               "date": "05-29-2020",
//               "value": 1
//         },
//         {
//               "date": "06-05-2020",
//               "value": 2
//         },
//         {
//               "date": "06-12-2020",
//               "value": 2
//         },
//         {
//               "date": "06-26-2020",
//               "value": 1
//         },
//         {
//               "date": "07-10-2020",
//               "value": 1
//         },
//         {
//               "date": "07-24-2020",
//               "value": 1
//         },
//         {
//               "date": "09-15-2020",
//               "value": 2
//         },
//         {
//               "date": "09-18-2020",
//               "value": 1
//         },
//         {
//               "date": "09-25-2020",
//               "value": 11
//         },
//         {
//               "date": "10-02-2020",
//               "value": 4
//         },
//         {
//               "date": "10-09-2020",
//               "value": 1
//         },
//         {
//               "date": "10-23-2020",
//               "value": 11
//         },
//         {
//               "date": "12-04-2020",
//               "value": 1
//         },
//         {
//               "date": "06-08-2021",
//               "value": 2
//         },
//         {
//               "date": "01-19-2021",
//               "value": 2
//         },
//         {
//               "date": "01-22-2021",
//               "value": 1
//         },
//         {
//               "date": "01-29-2021",
//               "value": 1
//         },
//         {
//               "date": "02-05-2021",
//               "value": 1
//         },
//         {
//               "date": "02-12-2021",
//               "value": 3
//         },
//         {
//               "date": "02-19-2021",
//               "value": 2
//         },
//         {
//               "date": "02-26-2021",
//               "value": 2
//         },
//         {
//               "date": "03-05-2021",
//               "value": 1
//         },
//         {
//               "date": "03-12-2021",
//               "value": 2
//         },
//         {
//               "date": "03-26-2021",
//               "value": 1
//         },
//         {
//               "date": "04-09-2021",
//               "value": 1
//         },
//         {
//               "date": "04-23-2021",
//               "value": 1
//         },
//         {
//               "date": "04-30-2021",
//               "value": 3
//         },
//         {
//               "date": "05-07-2021",
//               "value": 1
//         },
//         {
//               "date": "05-14-2021",
//               "value": 1
//         },
//         {
//               "date": "06-04-2021",
//               "value": 1
//         },
//         {
//               "date": "03-24-2020",
//               "value": 2
//         },
//         {
//               "date": "04-09-2020",
//               "value": 1
//         },
//         {
//               "date": "04-16-2020",
//               "value": 2
//         },
//         {
//               "date": "04-26-2020",
//               "value": 1
//         },
//         {
//               "date": "04-27-2020",
//               "value": 1
//         },
//         {
//               "date": "05-27-2020",
//               "value": 1
//         },
//         {
//               "date": "05-23-2020",
//               "value": 2
//         },
//         {
//               "date": "06-29-2020",
//               "value": 2
//         },
//         {
//               "date": "07-08-2020",
//               "value": 1
//         },
//         {
//               "date": "09-26-2020",
//               "value": 10
//         },
//         {
//               "date": "12-22-2020",
//               "value": 1
//         },
//         {
//               "date": "12-23-2020",
//               "value": 1
//         },
//         {
//               "date": "12-26-2020",
//               "value": 1
//         },
//         {
//               "date": "12-27-2020",
//               "value": 3
//         },
//         {
//               "date": "12-31-2020",
//               "value": 1
//         },
//         {
//               "date": "01-27-2021",
//               "value": 2
//         },
//         {
//               "date": "02-07-2021",
//               "value": 1
//         },
//         {
//               "date": "02-28-2021",
//               "value": 1
//         },
//         {
//               "date": "04-03-2021",
//               "value": 1
//         },
//         {
//               "date": "05-04-2021",
//               "value": 2
//         },
//         {
//               "date": "05-06-2021",
//               "value": 2
//         },
//         {
//               "date": "05-27-2021",
//               "value": 2
//         },
//         {
//               "date": "05-31-2021",
//               "value": 1
//         },
//         {
//               "date": "07-13-2021",
//               "value": 1
//         },
//         {
//               "date": "03-25-2020",
//               "value": 1
//         },
//         {
//               "date": "04-01-2021",
//               "value": 1
//         },
//         {
//               "date": "04-07-2021",
//               "value": 1
//         },
//         {
//               "date": "04-17-2020",
//               "value": 2
//         },
//         {
//               "date": "04-18-2020",
//               "value": 2
//         },
//         {
//               "date": "05-06-2020",
//               "value": 1
//         },
//         {
//               "date": "05-12-2020",
//               "value": 1
//         },
//         {
//               "date": "05-18-2020",
//               "value": 1
//         },
//         {
//               "date": "05-25-2020",
//               "value": 1
//         },
//         {
//               "date": "05-28-2020",
//               "value": 1
//         },
//         {
//               "date": "06-03-2020",
//               "value": 1
//         },
//         {
//               "date": "06-11-2020",
//               "value": 1
//         },
//         {
//               "date": "07-02-2020",
//               "value": 1
//         },
//         {
//               "date": "11-26-2020",
//               "value": 1
//         },
//         {
//               "date": "07-07-2020",
//               "value": 1
//         },
//         {
//               "date": "01-07-2021",
//               "value": 2
//         },
//         {
//               "date": "03-10-2021",
//               "value": 2
//         },
//         {
//               "date": "07-21-2020",
//               "value": 1
//         },
//         {
//               "date": "07-22-2020",
//               "value": 1
//         },
//         {
//               "date": "08-04-2020",
//               "value": 1
//         },
//         {
//               "date": "08-11-2020",
//               "value": 1
//         },
//         {
//               "date": "08-26-2020",
//               "value": 1
//         },
//         {
//               "date": "08-28-2020",
//               "value": 1
//         },
//         {
//               "date": "09-04-2020",
//               "value": 1
//         },
//         {
//               "date": "09-23-2020",
//               "value": 6
//         },
//         {
//               "date": "10-10-2020",
//               "value": 1
//         },
//         {
//               "date": "10-14-2020",
//               "value": 1
//         },
//         {
//               "date": "10-17-2020",
//               "value": 1
//         },
//         {
//               "date": "10-20-2020",
//               "value": 1
//         },
//         {
//               "date": "10-21-2020",
//               "value": 2
//         },
//         {
//               "date": "10-25-2020",
//               "value": 17
//         },
//         {
//               "date": "11-25-2020",
//               "value": 1
//         },
//         {
//               "date": "02-02-2021",
//               "value": 1
//         },
//         {
//               "date": "02-06-2021",
//               "value": 1
//         },
//         {
//               "date": "02-18-2021",
//               "value": 2
//         },
//         {
//               "date": "02-24-2021",
//               "value": 1
//         },
//         {
//               "date": "02-25-2021",
//               "value": 1
//         },
//         {
//               "date": "03-09-2021",
//               "value": 2
//         },
//         {
//               "date": "03-15-2021",
//               "value": 1
//         },
//         {
//               "date": "04-06-2021",
//               "value": 1
//         },
//         {
//               "date": "04-21-2021",
//               "value": 2
//         },
//         {
//               "date": "09-10-2020",
//               "value": 5
//         },
//         {
//               "date": "10-03-2020",
//               "value": 5
//         },
//         {
//               "date": "06-11-2021",
//               "value": 2
//         },
//         {
//               "date": "05-25-2021",
//               "value": 1
//         },
//         {
//               "date": "04-24-2021",
//               "value": 1
//         },
//         {
//               "date": "07-25-2021",
//               "value": 1
//         },
//         {
//               "date": "08-05-2021",
//               "value": 1
//         },
//         {
//               "date": "06-29-2021",
//               "value": 1
//         },
//         {
//               "date": "10-04-2020",
//               "value": 4
//         },
//         {
//               "date": "09-19-2020",
//               "value": 2
//         },
//         {
//               "date": "09-21-2020",
//               "value": 3
//         },
//         {
//               "date": "09-27-2020",
//               "value": 6
//         },
//         {
//               "date": "02-03-2021",
//               "value": 1
//         },
//         {
//               "date": "02-03-2020",
//               "value": 1
//         },
//         {
//               "date": "02-17-2021",
//               "value": 1
//         },
//         {
//               "date": "10-26-2020",
//               "value": 11
//         },
//         {
//               "date": "12-01-2020",
//               "value": 1
//         },
//         {
//               "date": "04-15-2020",
//               "value": 1
//         },
//         {
//               "date": "10-24-2020",
//               "value": 11
//         },
//         {
//               "date": "08-11-2021",
//               "value": 1
//         },
//         {
//               "date": "08-17-2021",
//               "value": 1
//         },
//         {
//               "date": "05-16-2020",
//               "value": 1
//         },
//         {
//               "date": "01-13-2021",
//               "value": 1
//         },
//         {
//               "date": "07-14-2021",
//               "value": 1
//         },
//         {
//               "date": "09-08-2021",
//               "value": 1
//         },
//         {
//               "date": "06-18-2021",
//               "value": 1
//         },
//         {
//               "date": "05-30-2020",
//               "value": 1
//         },
//         {
//               "date": "09-12-2020",
//               "value": 2
//         },
//         {
//               "date": "12-09-2020",
//               "value": 1
//         },
//         {
//               "date": "02-27-2021",
//               "value": 1
//         },
//         {
//               "date": "03-13-2021",
//               "value": 1
//         },
//         {
//               "date": "09-04-2021",
//               "value": 1
//         },
//         {
//               "date": "09-15-2021",
//               "value": 1
//         },
//         {
//               "date": "09-23-2021",
//               "value": 2
//         },
//         {
//               "date": "06-10-2021",
//               "value": 1
//         },
//         {
//               "date": "01-31-2021",
//               "value": 1
//         },
//         {
//               "date": "05-10-2021",
//               "value": 1
//         },
//         {
//               "date": "10-31-2020",
//               "value": 21
//         },
//         {
//               "date": "07-17-2021",
//               "value": 1
//         },
//         {
//               "date": "10-08-2021",
//               "value": 1
//         },
//         {
//               "date": "10-14-2021",
//               "value": 1
//         },
//         {
//               "date": "07-09-2020",
//               "value": 1
//         },
//         {
//               "date": "12-08-2020",
//               "value": 1
//         },
//         {
//               "date": "06-21-2021",
//               "value": 1
//         },
//         {
//               "date": "10-13-2021",
//               "value": 1
//         },
//         {
//               "date": "06-04-2020",
//               "value": 1
//         },
//         {
//               "date": "11-01-2020",
//               "value": 17
//         },
//         {
//               "date": "03-06-2021",
//               "value": 1
//         },
//         {
//               "date": "03-29-2021",
//               "value": 1
//         },
//         {
//               "date": "04-28-2021",
//               "value": 1
//         },
//         {
//               "date": "06-02-2021",
//               "value": 1
//         },
//         {
//               "date": "08-29-2020",
//               "value": 1
//         }
//   ]


  // d3.json("Spiralcondegram_final.json", function (error, data) {
  //     if (error) throw error;
  var color = d3.scaleOrdinal(d3.schemeCategory10)  
//   var color = d3.scaleSequential(d3.interpolate("Orange","Red"))

  .domain(d3.extent(condegram_json,d=> +d["value"]));


    var someData=condegram_json;
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
}
// });