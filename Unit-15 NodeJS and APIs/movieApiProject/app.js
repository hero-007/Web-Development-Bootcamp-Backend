// Sample API Request
// API endpoint - http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
// API Key - thewdb
// http://www.omdbapi.com/?i=tt3896198&apikey=thewdb

var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var movieList = [];

app.get('/', function(req, res) {
	res.render('index.ejs', {
		movieList: movieList
	});
});

app.get('/makeRequest', function(req, res) {
	var movieName = req.query['movieName'];
	var nMovieName = movieName.replace(' ', '+');
	var requestString = `http://www.omdbapi.com/?s=${nMovieName}&apikey=thewdb`;
	request(requestString, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			// response is successfully recieved
			var jsonBody = JSON.parse(body);
			var movies = jsonBody.Search;
			movieList = [];
			movies.forEach(function(movie) {
				var movieDetails = {};
				movieDetails['movieTitle'] = movie.Title;
				movieDetails['movieYear'] = movie.Year;
				movieDetails['imdbID'] = movie.imdbID;
				movieDetails['type'] = movie.Type;
				movieDetails['poster'] = movie.Poster;
				movieList.push(movieDetails);
			});

			console.log(movieList);
			res.redirect('/');
		}
	});
});

app.listen(3000, function(req, res) {
	console.log('Server is listening');
});
