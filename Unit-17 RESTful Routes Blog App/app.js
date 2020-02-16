var mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	express = require('express'),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	app = express();

// establish connection between app and MongoDB database
mongoose.connect('mongodb://localhost:27017/restblog', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Define a Schema for Blog Post
var blogPostSchema = new mongoose.Schema({
	title: String,
	img: String,
	body: String,
	created: { type: Date, default: Date.now }
});
// create a Model for Blog object
var BlogPost = mongoose.model('blogposts', blogPostSchema);

// Landing page route
app.get('/', function(req, res) {
	res.redirect('/blogPosts');
});

// INDEX ROUTE
app.get('/blogPosts', function(req, res) {
	// TODO: fetch list of blog post and render it in index.ejs
	BlogPost.find({}, function(err, posts) {
		// Posts will be an array of objects
		if (err) {
			console.log('Unable to fetch the data');
		} else {
			res.render('index', {
				posts: posts
			});
		}
	});
});

// NEW ROUTE
app.get('/blogPosts/new', function(req, res) {
	// TODO : render create form, for creating new blog post
	res.render('createPost');
});

// CREATE ROUTE
app.post('/blogPosts', function(req, res) {
	// TODO : push the new blog post into the DB and redirect to /blogPosts page
	req.body.blog.body = req.sanitize(req.body.blog.body);
	BlogPost.create(req.body.blog, function(err, post) {
		if (err) {
			res.render('/blogPosts/new');
		} else {
			console.log('Data inserted successfully');
			console.log(post);
			res.redirect('/blogPosts');
		}
	});
});

// SHOW ROUTE
app.get('/blogPosts/:id', function(req, res) {
	// TODO : render a blogpost.ejs and pass the retrieved data to blogpost.ejs
	var blogId = req.params.id;
	console.log(blogId);
	BlogPost.findById(blogId, function(err, blog) {
		if (err) {
			res.render('/blogPosts');
		} else {
			console.log('New Blog - ' + blog);
			res.render('blogpost', {
				blog: blog
			});
		}
	});
});

// EDIT ROUTE
app.get('/blogPosts/:id/edit', function(req, res) {
	var blogId = req.params.id;
	BlogPost.findById(blogId, function(err, foundBlog) {
		if (err) {
			res.render('index');
		} else {
			res.render('editForm', {
				foundBlog: foundBlog
			});
		}
	});
});

// UPDATE ROUTE
app.put('/blogPosts/:id', function(req, res) {
	var blogId = req.params.id;
	req.body.blog.body = req.sanitize(req.body.blog.body);
	BlogPost.findByIdAndUpdate(blogId, req.body.blog, function(err,updatedBlog){
		if(err)
		{
			res.redirect("/blogPosts");
		}
		else
		{
			// redirect to show page
			res.redirect(`/blogPosts/${blogId}`);
		}
	});
});

// DELETE ROUTE
app.delete('/blogPosts/:id',function(req,res){
	var blogId = req.params.id;
	BlogPost.findByIdAndRemove(blogId, function(err){
		if(err)
		{
			res.redirect("/blogPosts");
		}
		else{
			res.redirect("/blogPosts");
		}
	});
});

// Define a star route for handling all the invalid routes
app.get('*', function(req, res) {
	res.send("You've entered and invalid route");
});

// Starting the server
app.listen(3000, function(req, res) {
	console.log('Server is up and running !!!');
});
