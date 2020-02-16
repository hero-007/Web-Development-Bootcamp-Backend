var mongoose = require('mongoose');

// connecting to the database
mongoose.connect('mongodb://localhost/db');

var dogSchema = new mongoose.Schema({
	name: String,
	age: Number,
	isCute: String
});

// create a model object for dogs collection
var Dog = mongoose.model('dogs', dogSchema);

// creating a dog object and saving it to the collection
// var karbon = new Dog({
//     name: "Karbon",
//     age: 202,
//     isCute: "yes"
// });

// saving the object in the database
// karbon.save(function(err,dog){
//     if(err)
//     {
//         console.log("ERROR OCCURED : SOMETHING WENT WRONG");
//         console.log(err);
//     }
//     else{
//         console.log("Dog object successfully saved in the database");
//         console.log(dog);
//     }
// })

// Another way of adding Dog object in the Dogs collection
Dog.create(
	{
		name: 'ninja',
		age: 10,
		breed: 'Golden Retriever',
		isCute: 'yes'
	},
	function(err, dog) {
		// this represent a callback function
		// err - error object
		// dog - returns the object saved in the database
		if (err) {
			console.log('Error Occured : ' + err);
		} else {
			console.log(dog);
			console.log('Object saved in the database');
		}
	}
);

// retrieve all the objects present in the dogs collection using Dog model class
Dog.find({}, function(err, dogs) {
	// dogs represent the list of dog objects retrived from the database
	if (err) {
		console.log('Error Occured : ' + err);
	} else {
		console.log(dogs);
	}
});
