var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// global friends array 
var friends = ["akhil","raka", "takashi", "luffy", "dragon"];

app.get("/",function(req,res){
    res.render("index");
});

app.get("/friendlist",function(req,res){
    res.render("friends", {
        friends:friends,
    });
});

app.post("/addfriend",function(req,res){
    var newFriend = req.body["newFriend"];
    friends.push(newFriend);
    res.redirect("/friendlist");
});

app.listen(3000,function(req,res){
    console.log("Server is running !!!!");
})