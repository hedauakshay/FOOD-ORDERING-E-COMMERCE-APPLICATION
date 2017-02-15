

var express = require('express');
var router = express.Router();


router.get('/', function(req,res,next){


		Console.log("Succesfully Returned");
		res.json([{id: 123, name: "task1"}, {id: 234, name: "task2"}]);
});


router.get('/:id', function(req,res,next){


		console.log("Succesfully Created");

		res.json({id: 123, name: "task1"});
});



router.post('/create', function(req,res,next){
	var task = req.body;
	if(!task.FullName || (task.EmailID + '')){
		res.status(400);
		res.json({
			"error" : "Bad data"
		});
	} else {
		//Call Create task method
		console.log("Succesfully Created");
		res.json({
			id: 123,
			name: "task1"
		});
	}
});


//delete task
router.get('/:id/delete', function(req,res,next){
	// Call to delete task
		console.log("Succesfully Deleted");
});


//update 
router.put('/:id/update', function(req,res,next){
	var task = req.body;
	var updTask = {};
	//Update other fields as well
	if(task.FullName){
		updTask.FullName = task.FullName;
		console.log("Succesfully Deleted");
	}
});

module.exports = router;