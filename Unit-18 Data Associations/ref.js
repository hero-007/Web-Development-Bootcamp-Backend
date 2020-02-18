var mongoose = require('mongoose');
var User = require('./models/user');
var Post = require('./models/post');

mongoose.connect('mongodb://localhost:27017/sample_blog', { useNewUrlParser: true, useUnifiedTopology: true });
// Post Model - title, content
// var postSchema = mongoose.Schema({
// 	title: String,
// 	content: String
// });

// var Post = mongoose.model('posts', postSchema);

// // User Model - name, email
// var userSchema = mongoose.Schema({
// 	name: String,
// 	email: String,
// 	userPosts: [
// 		{
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: Post
// 		}
// 	]
// });

// var User = mongoose.model('users', userSchema);

// create post and add it to user
// Post.create(
// 	{
// 		title: 'How I',
// 		content: 'Lorem Ipsum Hello'
// 	},
// 	function(err, createdPost) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			// find the user and associate post with him
// 			User.findOne({ name: 'Joe' }, function(err, foundUser) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					foundUser.userPosts.push(createdPost);
// 					foundUser.save(function(err, savedUser) {
// 						if (err) {
// 							console.log(err);
// 						} else {
// 							console.log(savedUser);
// 						}
// 					});
// 				}
// 			});
// 		}
// 	}
// );

User.findOne({ name: 'Joe' }).populate('userPosts').exec(function(err, foundUser) {
	if (err) {
		console.log(err);
	} else {
		console.log(foundUser);
	}
});
