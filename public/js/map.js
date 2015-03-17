/*jslint browser: true, sloppy: true*/
/*global $*/

// Global Variables ====================================================
var placeData = [];
var userPoint = [];
var position = [];

// Map Variables & Settings ============================================

var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png")).setView(new L.LatLng(45.51, -122.67), 9);
//var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")).setView(new L.LatLng(45.51, -122.67), 9);

var smileMarkers = new L.layerGroup().addTo(map);
var mehMarkers = new L.layerGroup().addTo(map);
var frownMarkers = new L.layerGroup().addTo(map);

var controls = {
	'<span class="fa med fa-smile-o"></span>': smileMarkers,
	'<span class="fa med fa-meh-o"></span>': mehMarkers,
	'<span class="fa med fa-frown-o"></span>': frownMarkers
}
//L.control.layers("", controls).addTo(map);

var frownIcon = L.AwesomeMarkers.icon({
	icon: 'fa-frown-o',
	prefix: 'fa',
	markerColor: 'red'
});

var mehIcon = L.AwesomeMarkers.icon({
	icon: 'fa-meh-o',
	prefix: 'fa',
	markerColor: 'blue'
});

var smileIcon = L.AwesomeMarkers.icon({
	icon: 'fa-smile-o',
	prefix: 'fa',
	markerColor: 'green'
});


// Functions =============================================================

//Populate Map
function popMap() {
	$.getJSON('/api/placelist', function (data1) {
		if (map.hasLayer(userPoint)) {
			map.removeLayer(userPoint);
		};
		
		smileMarkers = [];
		smileMarkers = new L.layerGroup().addTo(map);
		mehMarkers = [];
		mehMarkers = new L.layerGroup().addTo(map);
		frownMarkers = [];
		frownMarkers = new L.layerGroup().addTo(map);

		var placeData = data1;

		for (var i = 0; i < placeData.length; i++) {
			if (placeData[i].rate == 1) {
				L.marker([placeData[i].lat, placeData[i].lng], {
					icon: smileIcon
				}).addTo(smileMarkers).bindPopup(placeData[i].comment);
			} else {
				if (placeData[i].rate == 2) {
					L.marker([placeData[i].lat, placeData[i].lng], {
						icon: mehIcon
					}).addTo(mehMarkers).bindPopup(placeData[i].comment);
				} else {
					L.marker([placeData[i].lat, placeData[i].lng], {
						icon: frownIcon
					}).addTo(frownMarkers).bindPopup(placeData[i].comment);
				};
			}
		};
		map.setView(new L.LatLng(placeData[0].lat, placeData[0].lng), 9);
	});
};

// Add Place
function addPlace(event) {
	event.preventDefault();
	
	map.removeLayer(smileMarkers);
	map.removeLayer(mehMarkers);
	map.removeLayer(frownMarkers);
	
	map.locate({
		setView: true,
		maxZoom: 16
	});

	map.on('locationfound', onLocationFound);

	map.on('locationerror', onLocationError);

	function onLocationFound(e) {
		var popOverLink = $('<button type="button" class="btn btn-lg" data-toggle="modal" data-target="#myModal">Here?</button>').click(function () {
			map.closePopup();
		})[0];

		if (map.hasLayer(userPoint)) {
			map.removeLayer(userPoint);
		};

		userPoint = new L.marker(e.latlng, {
			draggable: 'true'
		}).addTo(map);

		userPoint.on('dragend', function (event) {
			position = userPoint.getLatLng();
			userPoint.bindPopup(popOverLink, {
				'closeButton': false,
				'closeOnClick': false
			}).openPopup();
		});
	};

	function onLocationError(e) {
		alert(e.message);
	};

};

function savePoint(event) {
	var rateVal = 0;

	rateVal = $('.active').val();

	if (rateVal > 0) {

		var newPlace = {
			'lat': position.lat,
			'lng': position.lng,
			'timestamp': Date.now(),
			'rate': $('.active').val(),
			'comment': $('#comment').val()
		};
		// Post the object to database
		$.ajax({
			type: 'POST',
			data: JSON.stringify(newPlace),
//			url: '/api/addplace',
			url: 'https://api.mongolab.com/api/1/databases/effthisplace/collections/placelist?apiKey=kWDQt_LhOcoqnD3vdPCx_7OthM_5TOEJ',
			contentType: 'application/json',
			success: function(msg) {
			},
			error: function(msg){
			console.log(msg);
			}
		}).done(function (response) {
			// Clear the Map
			if (map.hasLayer(userPoint)) {
				map.removeLayer(userPoint);
			};
			// Clear the form
			$('#comment').val('');
			$('.active').removeClass('active');

			// Update the table
			popMap();
		});
	} else {
		// error out
		alert('Please add a location and a rating');
		return false;
	}
};


// DOM Ready =============================================================
$(document).ready(function () {

	popMap();

	$('#btnAddPlace').on('click', addPlace);

	$('#submit').on('click', savePoint);

	$('.ratebtn').on('click', function () {
		$('.ratebtn').removeClass('active');
		$(this).addClass('active');
		$('#dialog').dialog("close");
	});

	$("#dialog").dialog({
		autoOpen: false
	});
});