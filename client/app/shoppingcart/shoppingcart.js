'use strict';

angular.module('myApp.shoppingcart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shoppingcart', {
    templateUrl: 'shoppingcart/shoppingcart.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
	console.log("In shopping cart");
}]);
