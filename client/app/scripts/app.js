'use strict';

angular.module('jsApp', ['ngCookies', 'ui.router', 'ui.bootstrap']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

	// Public routes
	$stateProvider.state('public', {
		abstract: true,
		template: "<ui-view/>"
	}).state('public.home', {
		url: '/',
		controller: 'homeCtrl',
		templateUrl: '/partials/home'
	}).state('public.resume', {
		url: '/resume',
		templateUrl: '/partials/resume'
	}).state('public.404', {
		url: '/404/',
		templateUrl: '/partials/404'
	});

	$urlRouterProvider.otherwise('/404');

	// FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
	$urlRouterProvider.rule(function ($injector, $location) {
		if ($location.protocol() === 'file') {
			return;
		}
		// Note: misnomer. This returns a query object, not a search string
		var path = $location.path(),
			search = $location.search(),
			params;
		// check to see if the path already ends in '/'
		if (path[path.length - 1] === '/') {
			return;
		}
		// If there was no search string / query params, return with a `/`
		if (Object.keys(search).length === 0) {
			return path + '/';
		}
		// Otherwise build the search string and return a `/?` prefix
		params = [];
		angular.forEach(search, function (v, k) {
			params.push(k + '=' + v);
		});
		return path + '/?' + params.join('&');
	});

	$locationProvider.html5Mode(true);
}]);