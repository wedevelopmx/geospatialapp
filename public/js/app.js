angular.module('geospatial', ['ngRoute', 'ngResource', 'ngStorage', 'openlayers-directive', 'angular-underscore'])
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
	.run(['$http', 'Auth', function ($http, Auth) {
		//Review if user has been authenticated before
		Auth.init();
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
		}		
	})
	.config(['$routeProvider', 'policies', function($routeProvider, policies) {
		
		//Our complex logic for authentification and authorization validation
		var validateAuth = function($q, $timeout, $http, $location, $rootScope, Auth){ 
			// Initialize a new promise 
			var deferred = $q.defer();

			//which view we are gonna validate
			var view = $location.url();
			
			//User has not been logged or we did not noticed
			if (!Auth.isLoggedIn()){
				$http.get('/auth/loggedin').success(function(user){ 
					console.log('validateAuth: /auth/loggedin' + (user ? user.displayname : 'uknown'));
					Auth.loggedIn(user); // Even null

					if(Auth.userHasPermissionForView(view)){
						console.log('Has permissions for: ' + view);
						deferred.resolve(); 
					}
					// Not Authenticated 
					else { 
						$rootScope.message = {
							text: !Auth.isLoggedIn() ? 'You need to log in.' : 'You dont have permissions to this resource [' + view + ']',
							type: 'danger'
						};
							
						deferred.reject(); 
						$location.url('/'); 
					} 
				}); 

			} else {
				if(Auth.userHasPermissionForView(view)){
					console.log('Has permissions for: ' + view);
					deferred.resolve(); 
				} else {
					$rootScope.message = {
						text: 'You dont have permissions to this resource [' + view + ']',
						type: 'danger'
					};
					deferred.reject(); 	
					$location.url('/'); 
				}
				
			}
			
			return deferred.promise; 
		}; 

		//Configuring Routes and Auth
		for(path in policies) {
			//Build Route
			var route = {
				templateUrl: policies[path].templateUrl, 
				controller: policies[path].controller
			};

			//Add policy validation
			if(policies[path].permissions != undefined)
				route.resolve =  { auth: validateAuth };

			//Register route
			$routeProvider.when(path, route);
		}

		$routeProvider.otherwise({redirectTo: '/'});

		// $routeProvider
		// 	.when('/', {
		// 		templateUrl: 'template/dashboard.html',
		// 		controller: 'DashboardController'
		// 	})
		// 	.when('/projects', {
		// 		templateUrl: 'template/project/list.html',
		// 		controller: 'ProjectController',
		// 		resolve: { auth: validateAuth }
		// 	})
		// 	.when('/project/:id', {
		// 		templateUrl: 'template/project/view.html',
		// 		controller: 'ProjectController',
		// 		resolve: { auth: validateAuth }
		// 	})
		// 	.when('/project', {
		// 		templateUrl: 'template/project/new.html',
		// 		controller: 'ProjectController',
		// 		resolve: { auth: validateAuth }
		// 	})
		// 	.when('/team', {
		// 		templateUrl: 'template/team/list.html',
		// 		controller: 'TeamController',

		// 		resolve: { auth: validateAuth }
		// 	})
		// 	.when('/user', {
		// 		templateUrl: 'template/team/new.html',
		// 		controller: 'TeamController',
		// 		resolve: { auth: validateAuth }
		// 	})
		// 	.otherwise({redirectTo: '/'});
	}]);