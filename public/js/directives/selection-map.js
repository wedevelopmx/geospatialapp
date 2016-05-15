angular.module('geospatial')
	.directive('selectionmap', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/selection-map.html',
			replace: true,
			transclude: true,
			scope: {
				config: '=',
				marker: '=',
				location: '='
			},
			controller: ['$scope', '$http', 'MapService', function($scope, $http, MapService) {
				$scope.defaults = {
	                events: {
	                    map: [ 'singleclick', 'pointermove' ]
	                }
	            };

	            $scope.result = [];

				$scope.$on('openlayers.map.singleclick', function(event, data) {
		            $scope.$apply(function() {
		            	var location = MapService.sanitizeLocation(data, $scope.config.projection);		            
		            	$scope.marker.lat = location.lat;
		            	$scope.marker.lon = location.lon;
		            	$scope.marker.projection = location.projection;
		            });
		        });			

		        $scope.$watch('search', function(newVal, oldVal) {
		        	if(newVal === undefined || newVal.length < 5)
		        		return;
		        	var url = 'http://nominatim.openstreetmap.org/search/' + newVal + '?format=json&addressdetails=1&limit=10';
		        	$http.get(url).success(function(data){
		        		$scope.result = [];
		        		for(i in data) {
		        			$scope.result.push(data[i]);
		        		}
		        	});
		        });

		        $scope.setCenter = function(item) {
	        		$scope.config.center.lat = $scope.marker.lat = parseFloat(item.lat);
		            $scope.config.center.lon = $scope.marker.lon = parseFloat(item.lon);		        	
		            $scope.config.center.zoom = 10;
		        	$scope.location = item;
		        	$scope.result = [];
		        };

			}],
			link: function(scope, element, attr) {
				
			}
		};
	});


