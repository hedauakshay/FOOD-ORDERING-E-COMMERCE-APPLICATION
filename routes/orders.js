
var express = require('express');
var router = express.Router();


router.get('/', function(req,res,next){

		console.log("Succesfully Returned");
		res.json([{id: 123, description: "task1"}, {id: 234, description: "task2"}]);
});


router.get('/:id', function(req,res,next){


		console.log("Succesfully Fetched");
		res.json({id: 1, description: "order1"});
});



router.post('/create', function(req,res,next){
	var order = req.body;

	console.log("Succesfully Created");
	res.json({"success": true, id: 1});
});


//delete order
router.get('/:id/delete', function(req,res,next){
	// Call to delete order
		console.log("Succesfully Deleted");
		res.json({"success": true});
});

module.exports = router;