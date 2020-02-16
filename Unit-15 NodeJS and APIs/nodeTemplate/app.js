var express = require('express');
var app = express();
app.use(express.static('public')); // serve assets like JS and CSS from public directory
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.send('node template app is working');
});

app.get('/youlove/:personName', function(req, res) {
	var personName = req.params['personName'];
	res.render('love', {
		person: personName
	});
});

app.get('/posts', function(req, res) {
	var posts = [
		{
			title: 'Post 1',
			author: 'Lorem Ipsum'
		},
		{
			title: 'Post 2',
			author: 'Hero-007'
		},
		{
			title: 'Post 3',
			author: 'Luffy'
		}
	];

	res.render('posts', {
		posts: posts
	});
});

app.get('*', function(req, res) {
	res.send('you entered an invalid path');
});

app.listen(3000, function(res, req) {
	console.log('server is running!!!!');
});
