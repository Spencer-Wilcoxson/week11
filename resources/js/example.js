
var map;
var directionDisplay;

function initMap() {
	var dirPanel = document.getElementById("steps");
	directionDisplay = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 15
		});
		
	directionDisplay.setMap(map);
	directionDisplay.setPanel(dirPanel);
}

function performAction() {
	var destination = $("#end").val();
	// destination enetered
	if (destination != "") {
		navigate();
	}
	else {
		setCenter();
	}
}

function setCenter() {
	var center = $("#start").val();
	
	// geocode the results
	var geoCoder = new google.maps.Geocoder();
	geoCoder.geocode({ 'address': center}, function (results, status) {
		if (status == 'OK') {
			// set the center
			map.setCenter(results[0].geometry.location);
			
			// drop a marker
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		}
		else {
			window.alert("Geocode was not successful for the following reasons: " + status);
		}
	});
}

function navigate() {
	var end = $("#end").val();
	var start = $("#start").val();
	
	var directionService = new google.maps.DirectionsService();
	
	var request = {
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	};
	
	directionService.route(request, function(result, status) {
		if (status == 'OK') {
			directionDisplay.setDirections(result);
		}
	});
	
}