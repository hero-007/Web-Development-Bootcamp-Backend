// apikey for news api - ea70040f1e65450eb840ee9131c2cf67
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=ea70040f1e65450eb840ee9131c2cf67
var express = require('express'),
    request = require('request'),
    locus = require("locus"),
	bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var newsItems = [];
// Normal JS Methods

function getRequestURL(topic) {
	var apiKey = 'ea70040f1e65450eb840ee9131c2cf67';
	var baseURL = 'https://newsapi.org/v2/everything?';
	var finlURL = baseURL + 'q=' + topic + '&apiKey=' + apiKey;
	return finlURL;
}

function parseJSON(jsonResponse) {
	// this method will parse the jsonResponse and fill the newsItems array with JS objects
	var newsObject = jsonResponse['articles'];
	// var i = 0;  // counter for displaying only 10 news items
	newsItems = []; // dump all the news items from the previous topic

	newsObject.forEach(function(news) {
		var nws = {};
		nws['author'] = news['author'];
		nws['title'] = news['title'];
		nws['description'] = news['description'];

		newsItems.push(nws);
	});
}

// root path
app.get('/', function(req, res) {
	// display a home page where user will enter a search query and get the result
	res.render('index', {
		newsItems: newsItems
	});
});

// function for handling post request
app.post('/makeRequest', function(req, res) {
	var topic = req.body['topic'];
	console.log('topic : ' + topic);
	var reqURL = getRequestURL(topic);
	console.log('Request URL = ' + reqURL);
	// make request to the api
	request(reqURL, function(error, response, body) {
        // setting breakpoint using locus

		if (!error && response.statusCode == 200) {
			jsonResponse = JSON.parse(body);
			parseJSON(jsonResponse);
			// after this statement newItems is filled with new data
			res.redirect('/');
		}
	});
});

app.listen(3000, function(req, res) {
	console.log('server is up and running !!!!');
});
