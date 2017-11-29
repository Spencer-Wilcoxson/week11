const express = require('express');
const app = express();
const GoogleMapsAPI = require('googlemaps');



var gmAPI;
app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, () => console.log('application is running'));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/navigate', function (req, res) {
	var config = init();
	gmAPI = new GoogleMapsAPI(config);
	var geo = geocode(req);
	
});



function init() {
	var publicConfig = {
		key: 'AIzaSyAlCrHNlOhH7KhZW0gxV0RWCvBNNJjj7Ws',
		stagger_time: 1000,
		encode_polylines: false,
		secure: true
	};
	
	return publicConfig;
}

function geocode(req) {
	var start = req.query.start;
	var geo = {
		"address": start
	};
	
	gmAPI.geocode(geo, function(err, res) {
		setCenter(err, res);
	});
}

function setCenter(err, res) {
	console.log(res);
	var location = res.geometry;
	var params = {
		center: '5906 70th Ave NE, Marysville WA',
		zoom: 15,
		size: '600x600',
		maptype: 'roadmap',
		markers: {
			location: '5906 70th Ave NE, Marysville, WA',
			label: 'A',
			color: 'green',
			shadow: true
		}
	};
	
	gmAPI.staticMap(params);
	gmAPI.staticMap(params, function(err, binaryImage) {
		
	});
	
}
