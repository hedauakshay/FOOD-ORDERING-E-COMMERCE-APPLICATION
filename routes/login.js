var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request = require('request');

exports.sessionInfo = function(req, res){
	if(req.session.fullname)
	{
		json_responses = {"statusCode" : 200};
		res.send(json_responses)
	}else{
		json_responses = {"statusCode" : 401};
		res.send(json_responses)
	}
};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
}

exports.register = function(req, res){
	
	var usertype = req.param("usertype");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var password = req.param("password");
	var email = req.param("email");
	var phone_number = req.param("phone_number");

	//Connecting to mysql

	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'	
	});
	con.connect(function(err){
		if(err){
			console.log("Error connecting to Mysql");
			return;
		}
		console.log("Connected to Mysql Amazon RDS");
	});
	
	var query = "INSERT INTO userinfo(`usertype`,`fullname`,`lastname`,`password`,`email`,`phoneNumber`) VALUES (\"" + usertype +"\",\"" + firstname +"\",\"" + lastname +"\",\"" + password +"\",\"" + email +"\"," + phone_number +");"
	con.query(query, function(err,rows){
		if(rows.length == 0){
			//throw err;
			json_responses = {"statusCode" : 401, "register":"no"};
			res.send(json_responses);
			return;
		}else{
		json_responses = {"statusCode" : 200, "register":"yes"};
		res.send(json_responses);
		}
	});
	
};

exports.userID = function(req, res){
	console.log("Inside UserID api");
	var userId = req.session.userId;
	console.log(userId);
	res.send({"userId":userId});
};

exports.submitDishInfo = function(req, res){
	var description = req.param("description");
	var storeName = req.param("storeName");
	var price = req.param("price");
	var dishID = req.param("dishID");
	var userID = req.session.userId;
	console.log(description + "->" + storeName + "->" + price + "->" + dishID + "->" + req.session.userId);
	
	//var queryDishAdd = "INSERT INTO dishinfo (`dishid`, `userid`, `description`, `price`, `storename`) VALUES ("+ dishID +","+ req.session.userid +",\""+ description +"\","+ price +",\""+ storeName +"\");";
	var queryDishAdd = "INSERT INTO dishinfo (`dishid`, `userid`, `description`, `price`, `storename`) VALUES ("+dishID+","+userID+",\""+description+"\","+price+",\""+storeName+"\");";

	//Connecting to mysql

	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'	
	});
	con.query(queryDishAdd, function(err,rows){
		if(rows.length == 0){
			//throw err;
			console.log("Not found");
			return;
		}else{
		console.log("done");
		console.log(rows);
		var resp = {"statusCode" : 200, "submit":"yes"};
		res.send(resp);
		}
	});

}

exports.getChefDish = function(req, res){
	console.log("Inside getChefDish api");
	var chefID = req.param("userID");
	console.log(chefID);
	var queryCook = "SELECT * FROM dishinfo WHERE `userid` = "+ chefID;

	//Connecting to mysql

	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'	
	});
	con.query(queryCook, function(err,rows){
		if(rows.length == 0){
			//throw err;
			console.log("Not found");
			return;
		}else{
		console.log("getChefDish done");
		console.log(rows);
		res.send(rows);
		}
	});
}

exports.cklogin = function(req, res){
	
	var email, password;
	var json_responses;
	email = req.param("email");
	password = req.param("password");
	console.log(email);
	
	//Connecting to mysql
	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'	
	});
	
	con.connect(function(err){
		if(err){
			console.log("Error connecting to Mysql");
			return;
		}
		console.log("Connected to Mysql Amazon RDS");
	});
	console.log(email);
	var query_mysql = 'SELECT * FROM userinfo WHERE email = ' + con.escape(email);
	
	con.query(query_mysql, function(err,rows){
	if(rows.length > 0){
		req.session.fullname = rows[0].fullname;
		req.session.usertype = rows[0].usertype;
		req.session.userId = rows[0].userid;
		req.session.income = rows[0].income;
		console.log("Session initialized");
		console.log("Found");
		json_responses = {"statusCode" : 200, "login":"yes"};
		res.send(json_responses);
	}else{
		//throw err;
		console.log("Not found");
		json_responses = {"statusCode" : 401, "login":"no"};
		res.send(json_responses);
		return;
	}
});
};

exports.orderSubmit = function(req, res){
	
	var incomeMap = new Object();
	
	if(cookId in incomeMap){
		console.log("Exist");
	}
	var orderDone = true;

	var orderDetails = req.param("orderDetails");
	console.log("orderSubmit : " + orderDetails[0].cost);
	
	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'	
	});
	con.connect(function(err){
		if(err){
			console.log("Error connecting to Mysql");
			return;
		}
		console.log("Connected to Mysql Amazon RDS");
	});
	
	for(var i = 0; i<orderDetails.length; i++){
	
	// For mapping income of Chef

	var cookId = orderDetails[i].userId;
	var quant = orderDetails[i].cost;
	//incomeMap[cookId] = quant;
		
	if(cookId in incomeMap){
		console.log("Exist");
		var val = incomeMap[cookId];
		console.log("Existing value :" + val)
		val = val + quant;
		console.log("Existing value :" + val);
		incomeMap[cookId] = val;
	}else{
		incomeMap[cookId] = quant;
	}
		
	console.log(orderDetails[i].orderId);
	console.log(orderDetails[i].userId);
	console.log(orderDetails[i].statusid);
	console.log(orderDetails[i].dishId);
	console.log(orderDetails[i].cost);
	
	//var query = "INSERT INTO userinfo(`usertype`,`firstname`,`lastname`,`password`,`emailid`,`phone_number`) VALUES (\"" + con.escape(usertype) +"\",\"" + con.escape(firstname) +"\",\"" + con.escape(lastname) +"\",\"" + con.escape(password) +"\",\"" + con.escape(email) +"\"," + con.escape(phone_number) +");"
	var query2 = "INSERT INTO customerorder (`orderid`, `userid`, `statusid`, `dishid`, `price`) VALUES (" + orderDetails[i].orderId +"," + orderDetails[i].userId +"," + orderDetails[i].statusid +"," + orderDetails[i].dishId +"," + orderDetails[i].cost+");"////\"," + con.escape(phone_number) +");"
	var query23 = "INSERT INTO customerorder(`orderid`, `userid`, `statusid`, `dishid`, `price`) VALUES (6,6,6,64,6.66);"
	
	con.query(query2, function(err,rows){
		if(rows.length == 0){
			//throw err;
			orderDone = false;
			return;
		}else{
			orderDone = true;
		}
	});
	}
	if(orderDone){
		//console.log(incomeMap);
		for (var key in incomeMap) {
			  if (incomeMap.hasOwnProperty(key)) {
			    console.log(key + " -> " + incomeMap[key]);
			    var queryIncomeUser = key;
			    var queryIncomeCost = incomeMap[key];
			    var queryIncome = "UPDATE userinfo SET `income` = `income` + "+ queryIncomeCost +" WHERE `userid` = "+ queryIncomeUser +";";
			    con.query(queryIncome, function(err,rows){
					if(rows.length == 0){
						//throw err;
						console.log("Failed to Update the income of USER");
						return;
					}else{
						console.log("Updated the income of USER");
					}
				});
			  }
		}
		json_responses = {"statusCode" : 200, "register":"yes"};
		res.send(json_responses);
	}else{
		json_responses = {"statusCode" : 401, "register":"no"};
		res.send(json_responses);
	}
};

exports.chefInfo = function(req, res){
	//Connecting to mysql
	
	
	var con = mysql.createConnection({
		host	:'cmpe280.cvgurlpwnebx.us-west-2.rds.amazonaws.com',
		user	:'CMPE280_FOODIE',
		password:'CMPE280_FOODIE',
		port	:3306,
		database:'foodie'
		
	});

	con.connect(function(err){
		if(err){
			console.log("Error connecting to Mysql");
			return;
		}
		console.log("Connected to Mysql Amazon RDS");
	});
	var email = "aditya.dhende@sjsu.com";
	var query2 = 'SELECT * FROM userinfo WHERE email = ' + con.escape(email);
	var query_mysql = 'SELECT * FROM dishinfo';
	var query3 = "INSERT INTO userinfo(`usertype`,`firstname`,`lastname`,`password`,`emailid`,`phone_number`) VALUES (\"Cook\",\"Aditya\",\"Dhende\",\"aditya42$\",\"aditya.dhende@sjsu.com\",4086502307);"

	con.query(query_mysql, function(err,rows){
		if(rows.length == 0){
			//throw err;
			console.log("Not found");
			return;
		}else{
		console.log("done");
		//console.log(rows);
		res.send(rows);
		}
	});

	con.end();
};