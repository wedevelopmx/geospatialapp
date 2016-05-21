angular.module('geospatial')
	.controller('DashboardController', ['$scope', 'ProjectService', 'TemplateService', 'CountryService', function($scope, ProjectService, TemplateService, CountryService) {
		ProjectService.query().$promise.then(function(data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                data[i].label = {
                    message: TemplateService.compileTemplate('project-popup', data[i]),
                    show: false,
                    showOnMouseOver: true
                };
            }
            $scope.projects = data;
        });
        
        $scope.marker = ProjectService.get(1);    

        $scope.actions = {
            see: function(project) {
                $scope.marker = {
                    lat: project.lat, 
                    lon: project.lon, 
                    zoom: 2
                }
            }
        };

        $scope.$watch('state', function(newState, oldState) {
            if(newState !== undefined)
                $scope.layersHash[newState.name]
                    .style.fill.color = 'rgba(3, 137, 156, 0.8)';
            if(oldState !== undefined)
                $scope.layersHash[oldState.name]
                    .style.fill.color = 'rgba(3, 137, 156, 0.4)'; 
        });

        CountryService.query().$promise.then(function(data) {
            $scope.country = data[0];
            $scope.state = data[0].states[0];

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
	}]);

/* Map Sample
        angular.extend($scope, {
            london: {
                lat: 51.505,
                lon: -0.09,
                zoom: 4
            },
            markers: [
                {
                    name: 'Landon Mate!',
                    lat: 51.505,
                    lon: -0.09
                }
            ],
            defaults: {
                events: {
                    map: [ 'singleclick', 'pointermove' ]
                }
            },
            mouseposition: {},
            mouseclickposition: {},
            projection: 'EPSG:4326'
        });

        $scope.$on('openlayers.map.pointermove', function(event, data) {
            $scope.$apply(function() {
                if ($scope.projection === data.projection) {
                    $scope.mouseposition = data.coord;
                } else {
                    var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
                    $scope.mouseposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                }
            });
        });
        
        $scope.$on('openlayers.map.singleclick', function(event, data) {
            $scope.$apply(function() {
                if ($scope.projection === data.projection) {
                    $scope.mouseclickposition = data.coord;
                    $scope.markers.push({lat: data.coord[0], lon: data.coord[1]});
                } else {
                    var p = ol.proj.transform([ data.coord[0], data.coord[1] ], data.projection, $scope.projection);
                    $scope.mouseclickposition = {
                        lat: p[1],
                        lon: p[0],
                        projection: $scope.projection
                    }
                    $scope.markers.push({lat: p[1],lon: p[0]});
                }
            });
        });




*/