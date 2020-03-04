import React from "react";
import * as d3 from "d3";

const width = 1125;
const height = 575;

class Map extends React.Component {

    componentDidMount() {

        const { data } = this.props;
        const svg = d3
            .select(this.refs.chart)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");

        const projection = d3
            .geoMercator()
            .center([135, -30])
            .scale(750)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        const map = svg
            .selectAll("path")
            .data(data.geoAusData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "rgb(9, 157, 217)")
            .style("stroke", "black")
            .style("stroke-width", 0.5);

        var Tooltip = d3.select(this.refs.chart)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        var mouseover = function (d) {
            Tooltip.style("opacity", 1)
        }
        var mousemove = function (d) {
            Tooltip
                .html(d.properties.name)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 15) + "px")
        }
        var mouseleave = function (d) {
            Tooltip.style("opacity", 0)
        }

        var repeat = function() {
            svg.attr("r", 2)
            .transition()
            .duration(1000)
            .attr("r", 14)
            .transition()
            .duration(1000)
            .on("end", repeat);
        }

        svg.append("g")
            .selectAll("g")
            .data(data.geoAusCities.features)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
            .append("circle")
            .attr("class", "circle")
            .style("fill", "ff5722")
            .attr("stroke", "#ff5722")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .6)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition()
            .on("start", function repeat() {
                d3.active(this)
                .attr("r", 2)
                .transition()
                .duration(700)
                .attr("r", 14)
                .transition()
                .duration(700)
                .on("start", repeat);
            });
    }

    render() {
        const { data } = this.props;
        const styles = {
            container: {
                display: "grid",
                justifyItems: "center"
            }
        };
        return (
            <div ref="chart" style={styles.container}>
                <p style={{ textAlign: "center" }}>Melbourne and Sydney Marker on Australia Map.
            </p>
            </div>
        );
    }
}
export default Map;