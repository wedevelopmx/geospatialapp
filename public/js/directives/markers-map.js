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
				indicator: '=',
				filters: '='
			},
			controller: ['$scope', 'CountryService', 'IndicatorService', 'TemplateService', function($scope, CountryService, IndicatorService, TemplateService) {
				$scope.projection = 'EPSG:4326';
				
				//Default Position
				$scope.center = {
	                lat: $scope.marker.$resolved == undefined ? $scope.marker.lat : 19.4326, 
                	lon: $scope.marker.$resolved == undefined ? $scope.marker.lon : -99.1332, 
	                zoom: 5
	            };

	            $scope.defaults = {
	                events: {
	                    layers: [ 'mousemove', 'click']
	                }
	            };

	            //Loading Countries
	            CountryService.query().$promise.then(function(data) {
	            	$scope.country = data[0];
		            $scope.countries = data;

		            $scope.statesHash = {};

		            $scope.layersHash = {};
		            $scope.layers = [];

		            angular.forEach($scope.country.states, function(state, key) {

		                var layer = {
		                    name: state.id,
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
		                    },
		                    state: state //<--this is the marker
		                };

		                $scope.layersHash[state.name] = layer;

		                $scope.layers.push(layer);

		                layer.state.show = false;

			        	$scope.$on('openlayers.layers.' + layer.name + '.click', function(event, feature) {
				            $scope.$apply(function(scope) {
				            	angular.forEach($scope.country.states, function(state, key) {
				            		state.show = false;
				            		// if(state.label !== undefined) 
				            		// 	state.label.show = false;
				            	});
				            	event.targetScope.properties.state.show = true;  
				            	event.targetScope.properties.state.
					            	label = {
					                    message: TemplateService.compileTemplate('state-popup', event.targetScope.properties.state),
					                    show: true,
					                    showOnMouseOver: false
					                }
				            });
				        });
			        

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

		        $scope.$watch('filters', function(newInd, oldInd) {
		        	if(newInd !== undefined) {
		        		//Loading every filter
		        		angular.forEach($scope.filters, function(filter, filterKey) {
		        			//Loading indicator
		        			IndicatorService.get(filter.id).$promise
			        			.then(function(indicator) {
			        				//For each state
				                    angular.forEach(indicator.States, function(state, key) {
				                    	var layer = $scope.layersHash[state.name];
				                    	var value = parseFloat(state.Measurement.value);
				                    	layer.state.data = layer.state.data || {};
				                    	layer.state.data[indicator.title] = { 
				                    		value: value,
				                    		display: true
				                    	};

				                    	//Assign a color based on filters
				                    	if(value > filter.from && value < filter.to) {
				                    		layer.state.data[indicator.title].display = true;
				                    	} else {
				                    		layer.state.data[indicator.title].display = false;
				                    	}

				                        //This is the last filter to be evaluated
				                        if(filterKey == $scope.filters.length - 1) {
				                        	var avg = 0.0;
				                        	var show = true;
				                        	layer.state.avg = 0.0;
				                        	angular.forEach(layer.state.data, function(data, key) {
				                        		avg = avg + parseFloat(data.value); 
				                        		show = show && data.display;
				                        	});

				                        	layer.state.avg = avg / parseFloat($scope.filters.length);

				                        	layer.style.fill.color = measure(layer.state.avg, 100);
				                        	layer.display = show;
				                        }
				                    });
				                });
		        		});
		        	}
		        }, true); //<-- Deep watch!!!
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


