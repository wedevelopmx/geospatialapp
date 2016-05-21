angular.module('geospatial')
	.directive('markersmap', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/markers-map.html',
			replace: true,
			transclude: true,
			scope: {
				markers: '=',
				marker: '=',
				layers: '='
			},
			controller: ['$scope', function($scope) {
				$scope.projection = 'EPSG:4326';
				
				//Default Position
				$scope.center = {
	                lat: $scope.marker.$resolved == undefined ? $scope.marker.lat : 19.4326, 
                	lon: $scope.marker.$resolved == undefined ? $scope.marker.lon : -99.1332, 
	                zoom: 2
	            };
			}],
			link: function(scope, elem, attrs) {
				//Update center once promise has been resolved
			    scope.$watch('marker', function(newVal) {
			        if(newVal.$resolved || newVal.$resolved == undefined) {
				        scope.center = {
			                lat: newVal.lat,
			                lon: newVal.lon,
			                zoom: 5
			            };
			     	}
			    }, true);
			  }
		};
	});


