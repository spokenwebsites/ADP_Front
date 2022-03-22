try {

      function jsfunction(){
            alert("in edge bundling js function");
      }
var glbljson=[]

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

      var edge_json=[
            {
                  "name": "Lieberman Moti",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Gulliver Roland",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Prevost Adele Elise",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Wint Brandon",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Ferrier Ian",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Yalaoui Malek ",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Martonfi Ilona",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "McCrum Rachel",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Pennock Tyler",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "Camlot Jason",
                  "type": "ind_creator",
                  "imports": []
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Verse Prose Song ",
                  "imports": [
                        "Lieberman Moti"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series ft. Joy Priest Tina Zafreen Alam ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series ft. Jody Chan Eunice Andrada ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series Ft. Nisha Patel Naima Yael Tokunow ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series ft. Terese Mason Pierre Tatiana Johnson Boria ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series ft. Sanna Wani Em Dial ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series ft. Inam Kang Taylor Byas ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "TreeReadingSeries.Tree Reading Series Natasha Ramoutar Marianne Chan ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Lieberman Moti",
                        "Prevost Adele Elise",
                        "Martonfi Ilona"
                  ]
            },
            {
                  "name": "WordsandMusic.Words Music Online this Sunday ",
                  "imports": [
                        "Ferrier Ian",
                        "Camlot Jason"
                  ]
            },
            {
                  "name": "WordsandMusic.Words Music Online for the C r oolest Month ",
                  "imports": [
                        "Ferrier Ian",
                        "Camlot Jason"
                  ]
            },
            {
                  "name": "WordsandMusic.Say Play and Dance at Words Music Online ",
                  "imports": [
                        "Camlot Jason",
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "WordsandMusic.Words Music Solstice Show Sunday online ",
                  "imports": [
                        "Camlot Jason",
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "WordsandMusic.Silvervest Barillaro Par and Mash at W M Show Sunday ",
                  "imports": [
                        "Camlot Jason",
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "WordsandMusic.Summer in September at W M Sunday ",
                  "imports": [
                        "Camlot Jason",
                        "Ferrier Ian",
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "WordsandMusic.International Poets and Performers Sunday ",
                  "imports": [
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona"
                  ]
            },
            {
                  "name": "WordsandMusic.Poets Music Video and Art on Sunday ",
                  "imports": [
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "WordsandMusic.SpokenWeb Words Music ",
                  "imports": [
                        "Camlot Jason",
                        "Ferrier Ian"
                  ]
            },
            {
                  "name": "AtwaterPoetryProject.Atwater Poetry Project Online presents...Oana Avasilichioaei Margaret Christakos ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "AtwaterPoetryProject.Atwater Poetry Project Online presents Chantal Gibson ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "AtwaterPoetryProject.APP Online presents Ben Ladouceur K.B Thors ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "AtwaterPoetryProject.APP Online John Barton Molly Peacock ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "AtwaterPoetryProject.APP Online...Poem in Your Pocket Day Journ e du po me porter ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "VERSeOttawa.VerseFest 2020 Urban Legends ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "WordsFestLondonCanada.Reimagining Disability ",
                  "imports": [
                        "Wint Brandon"
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Across the Platform An Open Mic with QWF Arts By The People ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Local Reads Book Club Dominoes at the Crossroads ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Local Reads Book Club Yasmeen Haddad Loves Joanasi Maqaittik ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Local Reads Book Club Montreal City of Secrets ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Writing in Challenging Times ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "QuebecWritersFederation.Chronicling the Days Dispatches from a Pandemic Book Launch ",
                  "imports": [
                        "McCrum Rachel"
                  ]
            },
            {
                  "name": "PlanetEarthPoetry.Planet Earth Poetry Tyler Pennock ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "GladDayBookshop.Virtual Toronto Lit Up Bones ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "GladDayBookshop.Smut Peddlers An evening of LGBTQ erotica ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "GladDayBookshop.Panel INSTABILITY INSECURITY INSANITY Mental Health and the Writer ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "LibrairieDrawnQuarterly.Local Reads Book Club Dominoes at the Crossroads ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "LibrairieDrawnQuarterly.Local Reads Book Club Yasmeen Haddad Loves Joanasi Maqaittik ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "LibrairieDrawnQuarterly.Local Reads Book Club Montreal City of Secrets ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "LibrairieDrawnQuarterly.Local Reads Book Club Taximan ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "LibrairieDrawnQuarterly.Local Reads Book Club The Philistine ",
                  "imports": [
                        "Yalaoui Malek "
                  ]
            },
            {
                  "name": "ArgoBooks.Argo Zoom Reading Series Verse Prose Song ",
                  "imports": [
                        "Martonfi Ilona",
                        "Lieberman Moti",
                        "Prevost Adele Elise"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Downtime Ian Rankin ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Downtime Catherine Hernandez ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "WordVancouver.Virtual Toronto Lit Up Bones ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Toronto Lit Up Presents The Cyborg Anthology Virtual Launch ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.An Evening With Margaret Atwood ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.First Piece of the Puzzle Mark Billingham ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Waking from the American Dream Richard Ford ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Sleepwalking to Catastrophe Emily St. John Mandel ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Journeys of Self Discovery Billy Ray Belcourt Tyler Pennock ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Skin Hunger Tyler Pennock ",
                  "imports": [
                        "Pennock Tyler"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Family Identity Future David A. Robertson Jesse Thistle ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Keep Your Enemies Close Ian Rankin s A Song for the Dark Times ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Burning Bright Andr Alexis on The Night Piece ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            },
            {
                  "name": "TorontoInternationalFestivalofAuthors.Alexander McCall Smith How to Raise an Elephant ",
                  "imports": [
                        "Gulliver Roland"
                  ]
            }
      ]

      d3.json("/assets/js/Topten.json", function (error, classes) {
            if (error) throw error;
           // var classes=edge_json
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
                        alert('mouseover');
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
            console.log(creators)
            console.log(Events)
          
            node = node
                  .data(root.leaves())
                  .enter().append("text")
                  .attr("class", function (d) {
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
                  // .attr("fill", function (d) {
                  //       if (d.data.color == "Red") {
                  //             return d.data.color;
                  //       }
                  //       else {
                  //             return "Green"
                  //       }
                  // })
                  .on("mouseover", mouseovered)
                  .on("mouseout", mouseouted)
                  .on("click", nodeclicked)


      });
      console.log(count);
      function nodeclicked(d) {


            alert(d.data["name"]);
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

catch (error) {
      console.log(error)
}