$(document).ready(function () {

	var vals2 = [];
	var cats1 = [];
	var cats2 = [];
	var cats3 = [];
	
	$.getJSON('../js/data.json', function (data) {
		
		cats1  = _.countBy(data[0].features, function(d){return d.properties.commentType;});
		
		cats2 = _.countBy(data[1].features, function(d){return d.properties.commentType;});
		
		console.log(cats1);
		console.log(cats2);
		console.log(cats3);
		
		var vals = [
			{
				name: 'Bicycles', value: cats1.bicycles, icon: '\uf206'
			},{
				name: 'Business Access', value: cats1.businessAccess, icon: '\uf0d6'
			},{
				name: 'Turn Lane', value: cats1.centerTurnLane, icon: '\uf1b9'
			},{
				name: 'Pedestrian Crossing', value: cats1.pedestrianCrossing, icon: '\uf039'
			},{
				name: 'Sidewalks', value: cats1.sideWalks, icon: '\uf183'
			},{
				name: 'Street Lights', value: cats1.streetLuminance, icon: '\uf0eb'
			},{
				name: 'Transit', value: cats1.transit, icon: '\uf207'
			}];
		
		var margin = {top: 25,right: 20,bottom: 25,left: 20},
			 width = $('#dash2').width() - margin.left - margin.right,
			 height = width - margin.top - margin.bottom,
			 radius = height/2;

		var color = d3.scale.category10();

		var svg = d3.select("#dash2")
			.append("svg:svg")
			.data([vals])
			.attr("width", width)
			.attr("height", height)
			.append("svg:g")
			.attr("transform", "translate(" + radius + "," + radius + ")");

		var pie = d3.layout.pie().value(function(d){return d.value;});
		
		var arc = d3.svg.arc().outerRadius(radius - 80).innerRadius(80);
		
		var arcs = svg.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class","slice");
		
		arcs.append("svg:path")
			.attr("fill", function(d,i){return color(i);})
			.attr("d", function(d){return arc(d);})
			.attr("stroke-width", "1")
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
	
//		arcs.on("mouseover", function (d,i) {
//			d3.select(this)
//				.append("svg:text")
//				.attr("transform", function(d){
//					d.innerRadius = 0;
//					d.outerRadius = radius - 30;
//					return "translate(" + arc.centroid(d) + ")";})
//				.attr("text-anchor", "middle")
//				.attr("class", "icon")
//				.attr("fill", "white")
//				.text( function(d, i) {return vals[i].icon;});
//		});
//	
//		arcs.on("mouseleave", function () {
//			d3.select(this).select(".path0").attr("fill", "#FF6500");
//				d3.selectAll("text").remove();
//		});
		
	});
	

});