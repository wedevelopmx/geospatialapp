angular.module('geospatial', ['ngRoute', 'ngResource', 'ngStorage', 'openlayers-directive', 'angular-underscore', 'ui.bootstrap'])
	.config(['$httpProvider', function($httpProvider) {  
		// $httpProvider.interceptors.push(function($q, $location,$rootScope) { 
		// 	return { 
		// 		response: function(response) { 
		// 			return response; 
		// 		}, 
		// 		responseError: function(response) { 
		// 			console.log('Response: ' );
		// 			console.log(response);
		// 			if (response.status === 401)  {
		// 				$rootScope.message = 'You need to log in.'; 
		// 				$location.url('/'); 
		// 			}
						
		// 			return $q.reject(response); 
		// 		} 
		// 	}; 
		// });
	}])
	.run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
		//Review if user has been authenticated before
		Auth.init();
		$rootScope.$on('$routeChangeError', function(event, next, current) {
			if(current !== undefined)
				$location.url(current.$$route.originalPath);
			else 
				$location.url('/');
		});
	  }])
	.constant('policies',{
		'/': {
			templateUrl: 'template/dashboard.html',
			controller: 'DashboardController'
		},
		'/projects': {
			templateUrl: 'template/project/list.html',
			controller: 'ProjectController',
			permissions: ['admin']
		},
		'/project/:id': {
			templateUrl: 'template/project/view.html',
			controller: 'ProjectController',
			permissions: ['admin']
		},
		'/project': {
			templateUrl: 'template/project/new.html',
			controller: 'ProjectController',
			permissions: ['admin']
		},
		'/team': {
			templateUrl: 'template/team/list.html',
			controller: 'TeamController',

			permissions: ['admin']
		},
		'/user': {
			templateUrl: 'template/team/new.html',
			controller: 'TeamController',
			permissions: ['admin']
		},
		'/surveys': {
			templateUrl: 'template/survey/list.html',
			controller: 'SurveyController',
			permissions: ['admin']
		},
		'/survey/:id': {
			templateUrl: 'template/survey/new.html',
			controller: 'SurveyController',
			permissions: ['admin']
		}		
	})
	.config(['$routeProvider', 'policies', function($routeProvider, policies) {
		
		//Our NOT THAT complex logic for authentification and authorization validation
		var authResolver = function(path) {
		  return {
		    routingMessage : function(Auth, $q, $rootScope) {
				console.log(path)
				var deferred = $q.defer();

				Auth.userHasPermissionForView(path)
					.then(function(msg) {
						console.log(msg);
						deferred.resolve();
					}, function(msg) {
						$rootScope.message = msg;
						deferred.reject();
					});

				return deferred.promise;
			}
		  }
		};

		//Configuring Routes and Auth
		for(path in policies) {
			//Build Route
			var route = {
				templateUrl: policies[path].templateUrl, 
				controller: policies[path].controller
			};
			
			//Sync with server about user status
			route.resolve =  authResolver(path);

			//Register route
			$routeProvider.when(path, route);
		}

		$routeProvider.otherwise({redirectTo: '/'});
	}]);