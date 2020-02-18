var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample_blog', { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = mongoose.Schema({
	name: String,
	email: String
});

var User = mongoose.model('users', userSchema);

module.exports = User;
