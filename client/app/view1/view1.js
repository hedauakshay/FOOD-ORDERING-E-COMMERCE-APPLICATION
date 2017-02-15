
var ang = angular.module('myApp.view1', ['ngRoute'])
var total = 0;
var orderDetails = [];
var orderId = 0;
ang.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

ang.controller('View1Ctrl', ['$scope','$http','$timeout', function($scope, $http, $timeout, req) {
	$http({
		method : "POST",
		url : '/getChefInfo'
	}).success(function(data) {
		//checking the response data for statusCode
		if (data.statusCode == 401) {
			console.log("No data");
		}
		else{
			//Making a get call to the '/redirectToHomepage' API
			console.log("Chef Data Received");
			console.log(data[0].price);
			
			$scope.products = data;
			
		}
	}).error(function(error) {
		console.log("Error");
	});
	console.log("in View controller");
//	$scope.products = [
//	                  {name:'John', age:25, gender:'boy'},
//	                  {name:'Jessie', age:30, gender:'girl'},
//	                  {name:'Johanna', age:28, gender:'girl'},
//	                  {name:'Joy', age:15, gender:'girl'},
//	                  {name:'Mary', age:28, gender:'girl'},
//	                  {name:'Peter', age:95, gender:'boy'},
//	                  {name:'Sebastian', age:50, gender:'boy'},
//	                  {name:'Erika', age:27, gender:'girl'},
//	                  {name:'Patrick', age:40, gender:'boy'},
//	                  {name:'Samantha', age:60, gender:'girl'}
//	                ];
	$http({
		method : "POST",
		url : '/getSessionInfo'
	}).success(function(data) {
		//checking the response data for statusCode
		if (data.statusCode == 401) {
			console.log("No Add to cart");
			$scope.avatarMenuBool = false;
		}
		else{
			$scope.avatarMenuBool = true;
			$scope.addToCart = function(cost, userId, desc, cuisineId, dishId, storeName){
				
				orderId = Math.floor((Math.random() * 1000) + 1);
				
				console.log(orderId);
				orderDetails.push({"statusid" : 1, "orderId" : orderId, "cost" : cost, "userId" : userId , "desc" : desc , "cuisineId" : cuisineId, "dishId" : dishId, "storeName":storeName});
				console.log(cost);
				console.log(orderDetails);
				console.log(cost);
				total = total + cost;
				console.log(total);
				console.log("In add to ccart");
				$scope.total = total;
			}
		}
	}).error(function(error) {
		console.log("Error");
	});	
//	$scope.addToCart = function(cost, userId, desc, cuisineId, dishId, storeName){
//		
//		orderDetails.push({"cost" : cost, "userId" : userId , "desc" : desc , "cuisineId" : cuisineId, "dishId" : dishId, "storeName":storeName});
//		console.log(cost);
//		console.log(orderDetails);
//		total = total + cost;
//		console.log(total);
//		console.log("In add to ccart");
//		$scope.total = total;
//	}
	
	$scope.orderDetails = orderDetails;
	$scope.total = total;
	
	$scope.paymentDone = function(){
		console.log(orderDetails);
		//for(var i = 0; i<orderDetails.length; i++){
			//console.log(JSON.stringify(orderDetails[i]));
		//var dataJson = JSON.stringify(orderDetails[i]);
		console.log("Payment function");
			$http({
				method : "POST",
				url : '/orderSubmit',
				data : {
					"orderDetails": orderDetails
				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {
					console.log("No data");
				}
				else{
					//Making a get call to the '/redirectToHomepage' API
					console.log("Added");
					total = 0;
					orderDetails = [];
					$scope.res = "Food ordered successfully!";
					$timeout(function() {
						window.location.assign("/");
					    console.log("Redirect");
					}, 3000);
					
				}
			}).error(function(error) {
				console.log("Error");
			});
		//}
	}
	
}]);