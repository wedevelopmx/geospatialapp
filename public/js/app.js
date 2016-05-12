angular.module('geospatial', ['ngRoute', 'ngResource', 'openlayers-directive', 'angular-underscore'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'template/dashboard.html',
				controller: 'DashboardController'
			})
			.when('/projects', {
				templateUrl: 'template/project/list.html',
				controller: 'ProjectController'
			})
			.when('/project/:id', {
				templateUrl: 'template/project/view.html',
				controller: 'ProjectController'
			})
			.when('/project', {
				templateUrl: 'template/project/new.html',
				controller: 'ProjectController'
			})
			.when('/team', {
				templateUrl: 'template/team/list.html',
				controller: 'TeamController'
			})
			.when('/user', {
				templateUrl: 'template/team/new.html',
				controller: 'TeamController'
			})
			.otherwise({redirectTo: '/'});
	}]);