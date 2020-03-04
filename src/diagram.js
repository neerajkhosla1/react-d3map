import * as d3 from 'd3';
var node = document.createElement('div');

// var width = 960,
//     height = 500;

// var svg = d3.select(node).append("svg")
//     .attr("width", width)
//     .attr("height", height);

var svg = d3.select(node).append("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .center([2, 47])                // GPS of location to zoom on
    .scale(980)                       // This is like the zoom
    .translate([width / 2, height / 2])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (error, data) {
    console.log(error);
    console.log(data);
    // Filter data
    data.features = data.features.filter(function (d) { console.log(d.properties.name); return d.properties.name === "Australia" })

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "grey")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "none")
})

export default node;