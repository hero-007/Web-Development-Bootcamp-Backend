var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose); // This will add bunch of methods to this file from passportLocalMongoose to this file
// These methods are required for Authentication

module.exports = mongoose.model('User', UserSchema);
