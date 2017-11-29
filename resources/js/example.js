
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 15
		});
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