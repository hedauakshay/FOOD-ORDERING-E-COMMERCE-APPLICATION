console.log("In routes");
var login = angular.module('myApp', ['ngRoute', 'myApp.userAuth']);
//defining the login controller
login.controller('UserAuthCtrl', function($scope, $http) {
	console.log("In routes 2");
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	
	$scope.register = function(){
		console.log($scope.fullname);
		console.log($scope.usertype);
		$http({
			method : "POST",
			url : '/register',
			data : {
				"fullname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"password" : $scope.password,
				"usertype" : $scope.usertype,
				"email" : $scope.email,
				"phone_number" : $scope.phoneNumber
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else{
				//Making a get call to the '/redirectToHomepage' API
				console.log("Registered");
				$scope.result = "Registered";
			}
				
				
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.result = "Invalid";
		});
	}
	
	
	$scope.signIn = function() {
		console.log($scope.email);
		console.log("Inside a angularJS");
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else{
				//Making a get call to the '/redirectToHomepage' API
				console.log("Logged in");
				console.log(data.login);
				console.log(data.statusCode);
				window.location.assign("/");
			}		
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
})