
var map;
var directionDisplay;
var infoWindow;

function initMap() {
	var dirPanel = document.getElementById("steps");
	directionDisplay = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 15
		});
		
	infoWindow = new google.maps.InfoWindow;
	geoLocation();
		
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

function geoLocation() {
	var geoPosition;
	// the user must consent to use the geoLocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
			infoWindow.setPosition(pos);
			map.setCenter(pos);
            geoPosition = pos;
			
			var marker = new google.maps.Marker({
				map: map,
				position: pos
			});
		}, function () {
			handleLocationError(true, infoWindow, map.getCenter());
		});
		
		return geoPosition;
	}
	else {
		// GeoLocation not supported
		handleLocationError(false, infoWindow, map.getCenter());
		window.alert("GEOLOCATION NOT SUPPORTED");
	}
}
