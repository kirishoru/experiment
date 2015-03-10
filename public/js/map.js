/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var placeData = [];

// DOM Ready =============================================================
$(document).ready(function () {

	mapInit();
	// Add Place button click
	$('#btnAddPlace').on('click', addPlace);
	$('.ratebtn').on('click', function(){
		$('.ratebtn').removeClass('active');
		$(this).addClass('active');
	});

});

// Map Settings ========================================================

var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png"))
	.setView(new L.LatLng(45.51, -122.67), 9);
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
function mapInit() {
		$.getJSON('/placelist', function (data1) {
				var placeData = data1;
				for (var i = 0; i < placeData.length; i++) {
					if (placeData[i].rate == 1) {
						L.marker([placeData[i].lat, placeData[i].lng], {icon: smileIcon}).addTo(map).bindPopup(placeData[i].comment);
					} else {
						if (placeData[i].rate == 2) {
							L.marker([placeData[i].lat, placeData[i].lng], {icon: mehIcon}).addTo(map).bindPopup(placeData[i].comment);
						} else {
							L.marker([placeData[i].lat, placeData[i].lng], {icon: frownIcon}).addTo(map).bindPopup(placeData[i].comment);
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
	var rateVal = 0;
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
				mapInit();

			});

		});

	} else {
		// error out
		alert('Please add a location and a rating');
		return false;
	}
};