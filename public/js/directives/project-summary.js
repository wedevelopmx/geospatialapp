angular.module('geospatial')
	.directive('projectsummary', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/project-summary.html',
			replace: true,
			transclude: true,
			scope: {
				project: '=',
				actions: '='
			},
			controller: ['$scope', function($scope) {
				//Assigning call to outside world E.T Phone home!
				for(var name in $scope.actions) {
					$scope[name] = $scope.actions[name];
				}
			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


