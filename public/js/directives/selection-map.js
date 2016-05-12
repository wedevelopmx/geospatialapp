angular.module('geospatial')
	.directive('selectionmap', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/selection-map.html',
			replace: true,
			transclude: true,
			scope: {
				config: '=',
				marker: '='
			},
			controller: ['$scope', 'MapService', function($scope, MapService) {
				$scope.defaults = {
	                events: {
	                    map: [ 'singleclick', 'pointermove' ]
	                }
	            };

				$scope.$on('openlayers.map.singleclick', function(event, data) {
		            $scope.$apply(function() {
		            	var location = MapService.sanitizeLocation(data, $scope.config.projection);		            
		            	$scope.marker.lat = location.lat;
		            	$scope.marker.lon = location.lon;
		            	$scope.marker.projection = location.projection;
		            });
		        });				

			}],
			link: function(scope, element, attr) {
				
			}
		};
	});


