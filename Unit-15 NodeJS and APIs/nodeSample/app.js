var express = require('express');
var app = express();

// this will handle routes like - localhost/r/{name of the subreddit}
app.get('/r/:subreddit', function(req, res) {
	var response = 'WELCOME TO ' + req.params['subreddit'] + ' SUBREDDIT!!!!!';
	res.send(response);
});

// this will handle routes like - localhost/r/{name of the subreddit}/comments/{title of the post}
app.get('/r/:subreddit/comments/:postTitle', function(req, res) {
	var subreddit = req.params['subreddit'];
	var postTitle = req.params['postTitle'];

	var response = 'WELCOME TO THE ' + subreddit + ' SUBREDDIT AND ' + postTitle + ' POST OF THE SUBREDDIT.';
	res.send(response);
});
// splat route to handle all the invalid requests
app.get('*', function(req, res) {
	res.send('This is an Invalid route!!!!!');
});

app.listen(3000, function(req, res) {
	console.log('server is running !!!!');
});
