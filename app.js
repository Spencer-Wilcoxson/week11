const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.static('scripts'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true} ));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(process.env.PORT || 5012, () => console.log('Example is running'));

app.get('/navigate', function(req, res) {
    var start = req.query.start;
    var end = req.query.end;
	
	res.render('navigation', {
		start: start,
		destination: end
	});
});
