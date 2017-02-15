var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('client-sessions');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');
var orders = require('./routes/orders');
var orderItems = require('./routes/orderItems');
var login = require('./routes/login');

var port = 3007;

var app = express();

//configure the sessions with our application
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe280_test_string',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000  }));

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
var query23 = "INSERT INTO customerorder(`orderid`, `userid`, `statusid`, `dishid`, `price`) VALUES (6,6,6,64,6.66);"
var query234 = "UPDATE userinfo SET `income` = `income` + 50 WHERE `userid` = 1;";
var queryCook = "SELECT * FROM dishinfo WHERE `userid` = 1";
var a = 121;
var b = 1;
var c = "Chicken Teriyaki";
var d = 4.99;
var e = "Food Pakwan";
var queryDishAdd = "INSERT INTO dishinfo (`dishid`, `userid`, `description`, `price`, `storename`) VALUES ("+a+","+b+",\""+c+"\","+d+",\""+e+"\");";

con.query(query_mysql, function(err,rows){
	if(rows.length == 0){
		//throw err;
		console.log("Not found");
		return;
	}else{
	console.log("done");
	console.log(rows);
	}
});

con.end();

//View Engine
app.set('views', path.join(__dirname, '/client/app'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, '/client/app')));
app.use("/client", express.static('client'));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/logout', login.logout);
app.use('/tasks', tasks);
app.use('/orders', orders);
app.use('/users', users);
app.use('/order-items', orderItems);

app.post('/checklogin', login.cklogin);
app.post('/register', login.register);
app.post('/getChefInfo', login.chefInfo);
app.post('/getSessionInfo', login.sessionInfo);
app.post('/orderSubmit', login.orderSubmit);
app.post('/userID', login.userID);
app.post('/getChefDish', login.getChefDish);
app.post('/submitDishInfo', login.submitDishInfo);

app.listen(process.env.PORT || 3007, function(){
	  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
