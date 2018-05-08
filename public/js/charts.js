$(document).ready(function () {

	var data = [
		{
			"name": "Framework",
			"values": [10, 0]
}, {
			"name": "Resume",
			"values": [10, 0]
}, {
			"name": "Calculator Page",
			"values": [10, 0]
}, {
			"name": "Dashboad",
			"values": [2, 8]},
{
            "name": "Generator",
            "values": [2, 8]
}];

	var margin = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 20
		},
		width = $('#dash1').width() - margin.left - margin.right,
		height = width - margin.top - margin.bottom;
	var cwidth = width / (data.length * 3);
	//    var cwidth = 25;

	d3.selection.prototype.moveToFront = function () {
		return this.each(function () {
			this.parentNode.appendChild(this);
		});
	};

	var color = d3.scale.ordinal()
		.range(["#FF6500", "#825182"]);

	var svg = d3.select("#dash1")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

	var gs = svg.selectAll("g").data(data).enter().append("g");

	var pie = d3.layout.pie()
		.sort(null)
//		.startAngle(90 * (Math.PI / 180))
//		.endAngle(450 * (Math.PI / 180));
	        .endAngle(2 * Math.PI);

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

	gs.append("text")
		.attr("x", (width / 3) + 10)
		.attr("y", function (d, i) {
			return ((i - 2) * (height / data.length));
		})
		.text(function (d, i) {
			return d.name;
		})
		.attr("fill", "#FF6500")
		.style("font-weight", "bold");

	gs.on("mouseover", function () {
		d3.select(this).select(".path0").attr("fill", "#ffb333");

		var str = d3.select(this).select(".path0").attr("d");
		var res1 = str.split(",");
		var res2 = res1[1].split("A");
		var texty = d3.select(this.lastChild).attr("y");
		
		d3.select(this.parentNode)
			.append("path")
			.attr("class", "line")
			.attr("d", function () {
				return "M" + (res2[1] - (cwidth/2)) + ",0L" + (width / 3) + "," + texty;
			})
			.attr("stroke", "#60117D")
			.attr("stroke-width", 2)
			.attr("fill", "none");
		
		d3.select(this)
			.append("text")
			.attr("id", "percTag")
			.attr("x", (width / 3) + 10)
			.attr("y", (parseInt(texty) + 15))
			.text(function (d, i) {
				return d.values[0] * 10 + "% Complete";
			})
			.attr("fill", "#ffb333")
			.style("font-weight", "bold");
	});

	gs.on("mouseleave", function () {
		d3.select(this).select(".path0").attr("fill", "#FF6500");
				d3.selectAll("#percTag").remove();
				d3.selectAll(".line").remove();
	});
});