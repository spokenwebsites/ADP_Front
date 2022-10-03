
var importedcsv;
var map_json;

//This function retrieves the json data from the src/assets/js/Topten.json
//get_edge_bund_json is called in /src/app/viz3/viz3.component.ts.
//get_edge_bund_json has the json data.
function send_json_to_map_js_file(json){
    globalThis.map_json=json;

}

//This retrieves the csv from the file src/app/js/final.csv
//Calljsfile it's definition is called in /src/app/viz3/viz3.component.ts
function Calljsfile(mapcsv,test_json) {

//Width and height

var w = 1200;
var h = 800;


var projection = d3.geo.azimuthalEqualArea()
    .rotate([100, -45])
    .center([10, 20])
    .scale(1000)
    .translate([w/2, h/2])												  
//Define path generator
var path = d3.geo.path().projection(projection);

var zoom = d3.behavior.zoom()
            .scaleExtent([1, 8])
                .on("zoom", move);

var states_color = d3.scale.ordinal()
   
    .range(['#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4','#faf7d4']);

// Util func to move map to back and circles to front
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

//Create SVG
var svg = d3.select("#svganchor")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Load in GeoJSON data
// d3.json(map_json, function(json) {
    var json=test_json
    
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "dimgray")
       .style("opacity", 1)
       .attr("class","provincesbg")
    //    .attr("fill", function(d, i) {
    // 	   return states_color(i)})
       .each(function(){
            var sel = d3.select(this);
            sel.moveToBack();
        });
      
     //States
    svg.selectAll("text")
        .data(json.features)
        .enter()
        .append("text")
        // .attr("fill", "darkslategray")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("class","statestext")
        .text(function(d) {
            return d.properties.STATE_NAME;
        });

    //Append the name
    svg.append("text")
        .attr("x", 0)
        .attr("y", 340)
        .attr("font-size", 90)
        .attr("font-weight", "bold")
        .attr("font-family", "Times New Roman")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.5)
            
//});

function move() {
        var t = d3.event.translate,
            s = d3.event.scale;
        t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s), t[0]));
        t[1] = Math.min(height / 2 * (s - 1) + 230 * s, Math.max(height / 2 * (1 - s) - 230 * s, t[1]));
        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
}

// Add circles:
// d3.csv("final.csv", function(data) {

// Create a color scale
data=mapcsv
var allContinent = d3.map(data, function(d){return(d.homecontinent)}).keys()
var color = d3.scale.ordinal()
    .domain(allContinent)
    .range(d3.schemePaired);

// Add a scale for bubble size
var valueExtent = d3.extent(data, function(d) { return +d.n; })
var size = d3.scaleSqrt()
    .domain(valueExtent)  // What's in the data
    .range([2, 30])  // Size of circle in pixel

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("padding", "15px")
    .style("font", "12px sans-serif")
    .style("background", "#03bafc")
    .style("border", "0px")
    .style("border-radius", "8px")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");
svg
    .selectAll("myCircles")
    .data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
    .enter()
    .append("circle")
    .attr("cx", function(d){ return projection([+d.homelon, +d.homelat])[0] })
    .attr("cy", function(d){ return projection([+d.homelon, +d.homelat])[1] })
    .attr("r", function(d){
        
        console.log(size(+d.n +1) +2 ); return  size(+d.n +1) + 2 })
    .attr("class", function(d){
        console.log(d)
        if(d.n<20){
            return "eventslst20"
        }
        else if(d.n<40 && d.n>20){
            return "eventslst40"
        }
        else if(d.n<60 && d.n>40){
            return "eventslst60"
        }
        else if(d.n<80 && d.n>60){
            return "eventslst80"
        }
        else if(d.n<100 && d.n>80){
            return "eventslst100"
        }
        else {
            return "default"
        }

    })
    
   
    .on("click",function(d){
            alert(d);
    })
    .on("mouseover", function(){
        return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(d){
        tooltip.text(d.city + ' (' + d.n + ' Events)');
        return tooltip.style("top",
        (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){
        return tooltip.style("visibility", "hidden");
        });
   // });
    
    
    
   
    }
