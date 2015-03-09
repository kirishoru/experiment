/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var placeData = [];

// DOM Ready =============================================================
$(document).ready(function () {

    mapInit();
    // Add Place button click
    $('#btnAddPlace').on('click', addPlace);

});

// Map Settings ========================================================

var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png"))
        .setView(new L.LatLng(45.51, -122.67), 9);

//var mapIcon = L.icon({
//        iconUrl: '../img/finger.png',
//        iconSize: [40, 25], // size of the icon
//        shadowSize: [0, 0], // size of the shadow
//        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
//        shadowAnchor: [0, 0], // the same for the shadow
//        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//    });

// Functions =============================================================

//Populate Map
function mapInit() {
    $.getJSON('/placelist', function (data1) {
        var placeData = data1;
        for (var i = 0; i < placeData.length; i++) {
//            L.marker([placeData[i].lat, placeData[i].lng], {icon: mapIcon}).addTo(map);
			   L.marker([placeData[i].lat, placeData[i].lng]).addTo(map);
        };
		 
        map.setView(new L.LatLng(placeData[0].lat, placeData[0].lng), 9);
    });
};

// Add Place
function addPlace(event) {
    event.preventDefault();
    var rateVal = 0;
    rateVal = $('input[name=rate]:checked').val();

    // Check and make sure a location is entered and a rate is selected
    if (rateVal > 0 & $('inputLocation').val() !== '') {

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
                'rate': $('input[name=rate]:checked').val(),
                'comment': $('#comment').val()
                
            }
//				console.log(newPlace);
            // Use AJAX to post the object to the add service
            $.ajax({
                type: 'POST',
                data: JSON.stringify(newPlace),
                url: 'https://api.mongolab.com/api/1/databases/effthisplace/collections/placelist?apiKey=kWDQt_LhOcoqnD3vdPCx_7OthM_5TOEJ',
                contentType: 'application/json'
            }).done(function (response) {

                    // Clear the form inputs
                    $('.form-control').val('');
                    $('input[type=radio]').prop('checked', function () {
                        return this.getAttribute('checked') == 'checked';
                    });

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
