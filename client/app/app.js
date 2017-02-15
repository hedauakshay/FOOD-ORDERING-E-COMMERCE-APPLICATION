'use strict';


angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.userAuth'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
   .when('/userAuth', {
    templateUrl: './user/userAuth.html',
    controller: 'UserAuthCtrl'
  })
  .when('/', {
    templateUrl: '/view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/shoppingcart', {
	    templateUrl: '/shoppingcart/shoppingcart.html',
	    controller: 'View1Ctrl'
  })
  .when('/payment', {
	    templateUrl: '/shoppingcart/payment.ejs',
	    controller: 'View1Ctrl'
  })
  .when('/about', {
	    templateUrl: '/about/about.html',
	    controller: 'AboutCtrl'
  })
  .when('/contactUs', {
	    templateUrl: '/contactUs/contactUs.html',
	    controller: 'ContactUsCtrl'
  })
}]);
