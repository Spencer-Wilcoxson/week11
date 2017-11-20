var directionService = new google.maps.DirectionsService();
var directionDisplay;
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}

function directions() {
	directionDisplay = new google.maps.DirectionsRenderer();
	var chicago = new google.maps.LatLng(41.850033, -87.6500523);
	
	var mapOptions = {
		zoom: 8,
		center: chicago
	};
	
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	directionDisplay.setMap(map);
}

function calcRoute() {
	var start = "chicago, il";
	var end = "marysville, wa";
	
	var request = {
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	};
	
	directionService.route(request, function (results, status) {
		if (status == 'OK') {
			directionDisplay.setDirections(results);
		}
	});
}