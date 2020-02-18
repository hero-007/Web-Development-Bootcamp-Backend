var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sample_blog",{useNewUrlParser: true, useUnifiedTopology: true});



// Post Model - title, content
var postSchema = mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("post",postSchema);

// User Model - name, email
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    userPosts: [postSchema]
});

var User = mongoose.model("user",userSchema);

User.findOne({name:"John"},function(err,foundUser){
    if(err)
    {
        console.log(err);
    }
    else{
        // user found now attach a sample post with the user and save it to DB
        foundUser.userPosts.push({
            title:"Elephant ans Eagle",
            content:"Lorem Ipsum"
        });

        foundUser.save(function(err,savedUser){
            if(err)
            {
                console.log(err);
            }
            else{
                console.log(savedUser);
            }
        });
    }
});
