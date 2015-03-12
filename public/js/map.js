/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var placeData = [];

// Map Settings ========================================================

var userPoint = [];

var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")).setView(new L.LatLng(45.51, -122.67), 9);

var smileMarkers = new L.layerGroup().addTo(map);

var mehMarkers = new L.layerGroup().addTo(map);

var frownMarkers = new L.layerGroup().addTo(map);

var controls = {
	"Smiles": smileMarkers,
	"Mehs": mehMarkers,
	"Frowns": frownMarkers
}
L.control.layers("", controls).addTo(map);

var frownIcon = L.AwesomeMarkers.icon({
	icon: 'fa-frown-o',
	prefix: 'fa',
	markerColor: 'red'
});

var mehIcon = L.AwesomeMarkers.icon({
	icon: 'fa-meh-o',
	prefix: 'fa',
	markerColor: 'gray'
});

var smileIcon = L.AwesomeMarkers.icon({
	icon: 'fa-smile-o',
	prefix: 'fa',
	markerColor: 'green'
});


// Functions =============================================================

//Populate Map
function popMap() {
	$.getJSON('/placelist', function (data1) {
		if (map.hasLayer(userPoint)) {
			map.removeLayer(userPoint);
		};
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
			//			L.marker([placeData[i].lat, placeData[i].lng]).addTo(map).bindPopup(placeData[i].comment).openPopup();
		};
		map.setView(new L.LatLng(placeData[0].lat, placeData[0].lng), 9);
	});
};

// Add Place
function addPlace(event) {
	event.preventDefault();

	function onLocationFound(e) {
		var position = [];
		var popOverLink = $('<button class="btn btn-primary">Here?</button>').click(function() {
//			alert(position);
			var rate = 0
//function to rate and comment on a location. Will probably remove the location name
			random = Math.ceil(Math.random() * 3);
//			$.modal("<div><h1>SimpleModal</h1></div>");
			
//			$("#dialog").dialog({
//				modal: true,
//				resizable: false,
//				buttons: {
//					"smile": function() {
//						rate = 1;
//						$(this).dialog("close");
//					},
//					"meh": function() {
//						rate = 2;
//						$(this).dialog("close");
//					},
//					"frown": function() {
//						rate = 3;
//						$(this).dialog("close");
//					}
//				}
//			});
			var newPlace = {
//				'location': "TEST",
				'lat': position.lat,
				'lng': position.lng,
				'timestamp': Date.now(),
				'rate': random,
				'comment': "TEST"
			};
			
			// Use AJAX to post the object to the add service
			$.ajax({
				type: 'POST',
				data: JSON.stringify(newPlace),
				url: 'https://api.mongolab.com/api/1/databases/effthisplace/collections/placelist?apiKey=kWDQt_LhOcoqnD3vdPCx_7OthM_5TOEJ',
				contentType: 'application/json'
			}).done(function (response) {

			// Update the table
			popMap();

			});
		})[0];
		if (map.hasLayer(userPoint)) {
			map.removeLayer(userPoint);
		};
		userPoint = new L.marker(e.latlng, {draggable: 'true'}).addTo(map);
		userPoint.on('dragend', function (event) {
			position = userPoint.getLatLng();
			userPoint.bindPopup(popOverLink).openPopup();
		});
	};

	function onLocationError(e) {
		alert(e.message);
	};
	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.locate({
		setView: true,
		maxZoom: 16
	});


	/*	var rateVal = 0;
		rateVal = $('.active').val();
		
		// Check and make sure a location is entered and a rate is selected
		if (rateVal > 0 && $('#inputLocation').val() !== '') {

			// insert the geocoder here
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': $('#inputLocation').val()
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var userLat = (results[0].geometry.location.k);
					var userLng = (results[0].geometry.location.D);
				}

				// compile Place info into one object
				var newPlace = {
						'location': $('#inputLocation').val(),
						'lat': userLat,
						'lng': userLng,
						'timestamp': Date.now(),
						'rate': $('.active').val(),
						'comment': $('#comment').val()

					}
					// Use AJAX to post the object to the add service
				$.ajax({
					type: 'POST',
					data: JSON.stringify(newPlace),
					url: 'https://api.mongolab.com/api/1/databases/effthisplace/collections/placelist?apiKey=kWDQt_LhOcoqnD3vdPCx_7OthM_5TOEJ',
					contentType: 'application/json'
				}).done(function (response) {

					// Clear the form inputs
					$('.form-control').val('');
					$('.active').removeClass('active');

					// Update the table
					popMap();

				});

			});

		} else {
			// error out
			alert('Please add a location and a rating');
			return false;
		}*/
};


// DOM Ready =============================================================
$(document).ready(function () {

	popMap();

	$('#btnAddPlace').on('click', addPlace);


	$('.ratebtn').on('click', function () {
		$('.ratebtn').removeClass('active');
		$(this).addClass('active');
		$('#dialog').dialog("close");
	});

	$("#dialog").dialog({
				autoOpen: false
	});
	
});