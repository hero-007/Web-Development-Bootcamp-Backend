var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = require('./models/user-model'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	bodyParser = require('body-parser'),
	app = express();

// connecting to DB
mongoose.connect('mongodb://localhost:27017/user-auth-demo', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(
	require('express-session')({
		secret: 'Hero is the best',
		resave: false,
		saveUninitialized: false
	})
);

// initializing passport
app.use(passport.initialize());
app.use(passport.session());
// serialize and deserialize data from the session using the methods provided by passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// User.serializeUser() and User.deserializeUser() methods are added to user-model when we call UserSchema.plugin()
app.use(bodyParser.urlencoded({ extended: true }));

// ########################################################################## //
// ROUTES //

// INDEX ROUTE
app.get('/', function(req, res) {
	res.render('index');
});

// SECRET ROUTE
app.get('/secret', isLoggedIn, function(req, res) {
	res.render('secretPage');
});

// REGISTER ROUTES
app.get('/register', function(req, res) {
	// render registration form
	res.render('register');
});

app.post('/register', function(req, res) {
	// Enter the user to DB
	User.register(new User({ username: req.body.username }), req.body.password, function(err, savedUser) {
		if (err) {
			// render the form again
			console.log(err);
			res.render('register');
		}

		passport.authenticate('local')(req, res, function() {
			res.redirect('/secret');
		});
	});
});

// LOGIN ROUTES
app.get('/login', function(req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/secret',
		failureRedirect: '/login'
	}),
	function(req, res) {
		// Callback can be left empty for now...
	}
);

// LOGOUT ROUTE
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// isLoggedIn() middle-ware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
// LISTEN FOR REQUEST
app.listen(3000, function(req, res) {
	console.log('SERVER RUNNING...');
});
