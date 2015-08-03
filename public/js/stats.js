$(document).ready(function () {

	var rates = [];
	var vals = [];

	$.getJSON('/api/placelist', function (data) {
		rates = _.countBy(data, function(d){
			return d.rate;
		});
		vals = [{name: 'threes', value: rates[1], icon: '\uf118'},{name: 'twos', value: rates[2], icon: '\uf11a'},{name: 'ones', value: rates[3], icon: '\uf119'}];
		
		var margin = {top: 25,right: 20,bottom: 25,left: 20},
			 width = $('#dash2').width() - margin.left - margin.right,
			 height = width - margin.top - margin.bottom,
			 radius = height/2;

		var color = d3.scale.ordinal().range(["#FF6500", "#60117D", "#821A16"]);

		var svg = d3.select("#dash2")
			.append("svg:svg")
			.data([vals])
			.attr("width", width)
			.attr("height", height)
			.append("svg:g")
			.attr("transform", "translate(" + radius + "," + radius + ")");

		var pie = d3.layout.pie().value(function(d){return d.value;});
		
		var arc = d3.svg.arc().outerRadius(radius - 30).innerRadius(50);
		
		var arcs = svg.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class","slice");
		
		arcs.append("svg:path")
			.attr("fill", function(d,i){return color(i);})
			.attr("d", function(d){return arc(d);})
			.attr("stroke-width", "2")
			.attr("stroke", "#825182");
		
		arcs.append("svg:text")
			.attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = radius - 30;
				return "translate(" + arc.centroid(d) + ")";})
			.attr("text-anchor", "middle")
			.attr("class", "icon")
			.attr("fill", "white")
			.text( function(d, i) {return vals[i].icon;});
			
	});

});