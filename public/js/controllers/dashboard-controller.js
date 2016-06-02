angular.module('geospatial')
	.controller('DashboardController', ['$scope', 'ProjectService', 'TemplateService', 'CountryService', 'IndicatorService' , 
        function($scope, ProjectService, TemplateService, CountryService, IndicatorService) {

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

        $scope.indicator = {};
        $scope.indicators = [];

        IndicatorService.query().$promise.then(function(data) {
            $scope.indicators = data;
            $scope.indicator = data[0];
        });

        $scope.filters = [];
        $scope.addFilter = function() {
            $scope.indicator.from = 10;
            $scope.indicator.to = 40;
            $scope.filters.push($scope.indicator);
        }
	}]);