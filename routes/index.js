var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req,res,next){
	
	if(req.session.fullname)
	{
		if(req.session.usertype == "Cook")
		{
			console.log(req.session.income);
			console.log("Inside index.js loop for cook");
			res.render('chefProfile',{'name':req.session.fullname, 'userid':req.session.userId, 'income':req.session.income});
		}else{
			console.log("Inside index.js loop for user");
			res.render('index2',{'name':req.session.fullname});
		}
	}else{
		console.log("Inside not loop");
		res.render('index');
	}
	
});


module.exports = router;
