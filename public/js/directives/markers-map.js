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
				indicator: '='
			},
			controller: ['$scope', 'CountryService', 'IndicatorService', function($scope, CountryService, IndicatorService) {
				$scope.projection = 'EPSG:4326';
				
				//Default Position
				$scope.center = {
	                lat: $scope.marker.$resolved == undefined ? $scope.marker.lat : 19.4326, 
                	lon: $scope.marker.$resolved == undefined ? $scope.marker.lon : -99.1332, 
	                zoom: 2
	            };

	            //Loading Countries
	            CountryService.query().$promise.then(function(data) {
	            	$scope.country = data[0];
		            $scope.countries = data;

		            $scope.layersHash = {};
		            $scope.layers = [];
		            angular.forEach($scope.country.states, function(state, key) {
		                var layer = {
		                    name: state.name,
		                    source: {
		                        type: 'GeoJSON',
		                        url: 'json/states/' + state.id + '.json'
		                    },
		                    style: {
		                        fill: {
		                            color: 'rgba(3, 137, 156, 0.4)'
		                        },
		                        stroke: {
		                            color: 'white',
		                            width: 1
		                        }
		                    }
		                };

		                $scope.layersHash[state.name] = layer;

		                $scope.layers.push(layer);

		            });
		        });

		        var measure = function(rate, base) {
		            var step = base / 5;
		            
		            if(rate > 4* step)
		            	return 'rgba(0, 180, 100, 0.4)';
		            if(rate > 3 * step)
		            	return 'rgba(170, 255, 0, 0.4)';
		           	if(rate > 2 * step)
		            	return 'rgba(255, 255, 0, 0.4)';
		            if(rate > step)
		            	return 'rgba(245, 150, 0, 0.4)';

		            return 'rgba(255, 0, 0, 0.4)';	
		        }

		        $scope.$watch('indicator', function(newInd, oldInd) {
		            if(newInd.id !== undefined) {
		                IndicatorService.get(newInd.id).$promise.then(function(data) {
		                    angular.forEach(data.States, function(state, key) {
		                        $scope.layersHash[state.name]
		                            .style.fill.color = measure(parseFloat(state.Measurement.value), 100);
		                    });
		                });
		            }
		                
		        });

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


