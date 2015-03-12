var map = new L.Map('map').addLayer(new L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")).setView(new L.LatLng(45.51, -122.67), 9);

var circle = [];

function addCircle () {
	event.preventDefault();

	if (map.hasLayer(circle)) {
		map.removeLayer(circle);
	};
	circle = new L.circle([45.51, -122.67], 20000).addTo(map);
};

function delCircle () {
	map.removeLayer(circle);
};

$(document).ready(function () {

	$('#addCircle').on('click', addCircle);
	$('#delCircle').on('click', delCircle);

});