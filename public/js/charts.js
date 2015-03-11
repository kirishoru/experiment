$(document).ready(function () {

    var data = [
        {
            "name": "Milestone 1",
            "values": [2, 8]
}, {
            "name": "Milestone 2",
            "values": [3, 7]
}, {
            "name": "Milestone 3",
            "values": [4, 6]
}, {
            "name": "Milestone 4",
            "values": [5, 5]
}, {
            "name": "Milestone 5",
            "values": [6, 4]
}];

    var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        width = 400 - margin.left - margin.right,
        height = width - margin.top - margin.bottom;
    var cwidth = 25;

    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    var color = d3.scale.ordinal()
        .range(["#7FA1FF", "#ebebeb"]);

    var svg = d3.select("#dash")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var gs = svg.selectAll("g").data(data).enter().append("g");

    var pie = d3.layout.pie()
        .sort(null)
        .startAngle(90 * (Math.PI/180))
        .endAngle(450 * (Math.PI/180));
//        .endAngle(2 * Math.PI);

    var arc = d3.svg.arc()
        .innerRadius(function (d, i, j) {
            return 1 + cwidth * j;
        })
        .outerRadius(function (d, i, j) {
            return cwidth * (j + 1);
        });

    var path = gs.selectAll("path")
        .data(function (d) {
            return pie(d.values);
        })
        .enter()
        .append("path")
        .attr("class", function (d, i) {
            return "path" + i;
        })
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", function (d, i, j) {
            return arc(d, i, j);
        });

    gs.on("mouseover", function () {
        d3.select(this).select(".path0").attr("fill", "#ffb333");

        var str = d3.select(this).select(".path0").attr("d");
        var res1 = str.split(",");
        var res2 = res1[1].split("A");

        d3.select(this.parentNode).append("path").attr("class", "line").attr("d", function () {
                return "M0," + res2[0] + "L0,135";
            })
            .attr("stroke", "#ffb333").attr("stroke-width", 3).attr("fill", "none");

        d3.select(this).append("text").attr("x", 0).attr("y", 150)
            .text(function (d, i) {
                return d.name + ": " + d.values[0] * 10 + "% Complete";
            })
            .attr("fill", "#7FA1FF")
            .style("font-weight", "bold");
    });

    gs.on("mouseleave", function () {
        d3.select(this).select(".path0").attr("fill", "#7FA1FF");
        d3.selectAll("text").remove();
        d3.selectAll(".line").remove();
    });
});