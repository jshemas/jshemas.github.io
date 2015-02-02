'use strict';
angular.module('jsApp', ['gist', 'ngRoute', 'angulartics', 'angulartics.google.analytics']).config(
	[
		'$httpProvider',
		'$analyticsProvider',
		function (
			$httpProvider,
			$analyticsProvider
		) {}
	]
)
.run(['$route', function($route) {
	$route.reload();
}])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: '/views/home',
			controller: 'homeCtrl'
		})
		.when('/resume', {
			templateUrl: '/views/resume'
		})
		.when('/node', {
			templateUrl: '/views/node'
		})
		.when('/angular', {
			templateUrl: '/views/angular'
		})
		.when('/mongo', {
			templateUrl: '/views/mongo'
		})
		.when('/grunt', {
			templateUrl: '/views/grunt'
		})
		.when('/404', {
			templateUrl: '/views/404'
		})
		.otherwise({
			redirectTo: '/home'
		});
}]);