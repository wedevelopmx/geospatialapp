angular.module('geospatial')
	.directive('singlemarkermap', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/single-marker-map.html',
			replace: true,
			transclude: true,
			scope: {
				marker: '='
			},
			controller: ['$scope', function($scope) {
				$scope.projection = 'EPSG:4326';
				//Default Position
				$scope.center = {
	                lat: $scope.marker.$resolved == undefined ? $scope.marker.lat : 19.4326, 
                	lon: $scope.marker.$resolved == undefined ? $scope.marker.lon : -99.1332, 
	                zoom: 5
	            };
			}],
			link: function(scope, elem, attrs) {
				//Update center once promise has been resolved
			    scope.$watch('marker', function(newVal) {
			        if(newVal.$resolved) {
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


