var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample_blog', { useNewUrlParser: true, useUnifiedTopology: true });

var postSchema = mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model('posts', postSchema);

module.exports = Post;
