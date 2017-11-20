const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, () => console.log('application is running'));

app.get('/', function (req, res) {
	res.render('index');
});