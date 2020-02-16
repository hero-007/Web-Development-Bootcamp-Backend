var express = require("express");
var app = express();

// route for index page
app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment!");
});

// routes for handling the speaking task
app.get("/speak/:animalName",function(req,res){
    var animalName = req.params["animalName"];

    if(animalName === "pig")
        res.send("The pig says Oink!");
    else if(animalName === "cow")
        res.send("The cow says Moo");
    else if(animalName === "dog")
        res.send("The dog says Woof Woof!");
    else
        res.send(""+animalName+" doesn't know what to say");
});

// routes for handling repeat request 
app.get("/repeat/:wordToRepeat/:numOfTimes",function(req,res){
    var wordToRepeat = req.params["wordToRepeat"];
    var numOfTimes = Number(req.params["numOfTimes"]);
    var response = "";

    for(var i=0;i<numOfTimes;i++)
    {
        response += wordToRepeat;
        response += " ";
    }

    res.send(response);
});

// splat route for handling all the invalid requests
app.get("*",function(req,res){
    res.send("Sorry, page not found...What are you doing with your life!");
});

// starting the server 
app.listen(3000,function(req,res){
    console.log("Server is running successfully");
});