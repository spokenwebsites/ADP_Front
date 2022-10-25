try {

      //This function retrieves the json data from the src/assets/js/Topten.json
      //get_edge_bund_json is called in /src/app/viz2/viz2.component.ts.
      //get_edge_bund_json(json), param:json- has the json data.

      function get_edge_bund_json(json, onClick) {
            var edgebundling_json = [];
            console.log("json", json)
            edgebundling_json = json;
            var diameter = 700,
                  radius = diameter / 2,
                  innerRadius = radius - 120;

            var cluster = d3.cluster()
                  .size([360, innerRadius]);

            var line = d3.radialLine()
                  .curve(d3.curveBundle.beta(0.85))
                  .radius(function (d) { return d.y; })
                  .angle(function (d) { return d.x / 180 * Math.PI; });

            var svg = d3.select(".container").append("svg")
                  .attr("width", diameter)
                  .attr("height", diameter)
                  .append("g")
                  .attr("transform", "translate(" + radius + "," + radius + ")");

            var link = svg.append("g").selectAll(".link"),
                  node = svg.append("g").selectAll(".node");



            count = 0;
            // d3.json("Topten.json", function (error, classes) {
            //       if (error) throw error;
            var classes = edgebundling_json;
            var root = packageHierarchy(classes)
                  .sum(function (d) { return d.size; });

            cluster(root);

            link = link
                  .data(packageImports(root.leaves()))
                  .enter().append("path")
                  .each(function (d) { d.source = d[0], d.target = d[d.length - 1]; })
                  .attr("class", "link")
                  .attr("d", line)
                  .on('click', function (d) {
                        // alert('mouseover');
                  });
            creators = [];
            Events = [];
            for (let index = 0; index < root.leaves().length; index++) {
                  if (root.leaves()[index].data.color == "Red") {
                        creators.push(root.leaves()[index]);
                  } else {
                        Events.push(root.leaves()[index])
                  }

            }

            node = node
                  .data(root.leaves())
                  .enter().append("text")
                  .attr("class", function (d) {
                        //This will add css classes based on creator and events
                        if (d.data.color == "Red") {
                              return "creator";
                        }
                        else {
                              return "events"
                        }
                  })
                  .attr("dy", "0.31em")
                  .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
                  .attr("text-anchor", function (d) { return d.x < 180 ? "start" : "end"; })
                  .text(function (d) { console.log(d.data.key); return d.data.key; })

                  .on("mouseover", mouseovered)
                  .on("mouseout", mouseouted)
                  .on("click", nodeclicked)


            // });
            function nodeclicked(d) {
                  event.stopPropagation();
                  event.preventDefault();
                  onClick(d.data["name"]);
            }
            function mouseovered(d) {
                  node
                        .each(function (n) { n.target = n.source = false; });

                  link
                        .classed("link--target", function (l) { if (l.target === d) return l.source.source = true; })
                        .classed("link--source", function (l) { if (l.source === d) return l.target.target = true; })
                        .filter(function (l) { return l.target === d || l.source === d; })
                        .raise()
                        .on('click', function (d) {
                              alert('mouseover');
                        });
                  node
                        .classed("node--target", function (n) { return n.target; })
                        .classed("node--source", function (n) { return n.source; });
            }

            function mouseouted(d) {
                  link
                        .classed("link--target", false)
                        .classed("link--source", false);

                  node
                        .classed("node--target", false)
                        .classed("node--source", false);
            }

            // Lazily construct the package hierarchy from class names.
            function packageHierarchy(classes) {
                  var map = {};

                  function find(name, data) {
                        var node = map[name], i;
                        if (!node) {
                              node = map[name] = data || { name: name, children: [] };
                              if (name.length) {
                                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                                    node.parent.children.push(node);
                                    node.key = name.substring(i + 1);
                              }
                        }
                        return node;
                  }

                  classes.forEach(function (d) {
                        find(d.name, d);
                  });

                  return d3.hierarchy(map[""]);
            }

            // Return a list of imports for the given array of nodes.
            function packageImports(nodes) {
                  var map = {},
                        imports = [];

                  // Compute a map from name to node.
                  nodes.forEach(function (d) {
                        map[d.data.name] = d;
                  });

                  // For each import, construct a link from the source to target node.
                  nodes.forEach(function (d) {
                        if (d.data.imports)
                              d.data.imports.forEach(function (i) {
                                    imports.push(map[d.data.name].path(map[i]));
                              });
                  });

                  return imports;
            }
      }
}

catch (error) {
      console.log(error)
}
