angular.module('geospatial')
	.controller('DashboardController', ['$scope', 'ProjectService', 'TemplateService', function($scope, ProjectService, TemplateService) {
		ProjectService.query().$promise.then(function(data) {
            console.log(data);
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