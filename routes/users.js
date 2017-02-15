var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){

	
		console.log("Succesfully Created");
		res.json([{id: 123, name: "user1"}, {id: 1234, name: "user2"}]);
});


router.get('/:id', function(req,res,next){


		console.log("Succesfully Created");

		res.json({id: 123, name: "user1"});
});


router.post('/create', function(req,res,next){
	var user = req.body;
	console.log("Succesfully Created");
	res.json({id: 12345, name: "user3"});

});


router.post('/:id/delete', function(req,res,next){
	
		console.log("Succesfully Deleted");
		res.json({id: 123});
});

router.post('/:id/edit', function(req,res,next){

		console.log("Succesfully Updated");
		res.json({id: 123, name: "User1", email: "user@name.com"});
});


module.exports = router;