console.log("in controller chef");
var app = angular.module('chefProfile', []);

var userID = 0;
app.controller('chefProfileCtrl', ['$scope','$http',function($scope, $http) {
	console.log("Insdie chefProfileCtrl controller");
	$http({ method: 'POST',
        url: '/userID'
     }).success(function (response){
        console.log("User ID : " + response.userId);
        userID = response.userId;
        
        $http({ method: 'POST',
            url: '/getChefDish',
            data : {
				"userID": response.userId
			}
         }).success(function (data){
            console.log("Dish Info received");          
            console.log(data);
            
            $scope.products = data;
            
         }, function (error) {});
        
     }, function (error) {});
	
	$scope.submitDish = function(){
		console.log($scope.description);
		console.log($scope.storeName);
		console.log($scope.price);
		console.log("Inside submitDish");
		var dishID = Math.floor((Math.random() * 10000) + 1);
		
		$http({ method: 'POST',
            url: '/submitDishInfo',
            data : {
				"description": $scope.description,
				"storeName": $scope.storeName,
				"price": $scope.price,
				"dishID": dishID
			}
         }).success(function (data){
            console.log("Dish Info Submitted"); 
            window.location.assign("/");
         }, function (error) {});
	}
	
}]);
