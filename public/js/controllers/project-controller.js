angular.module('geospatial')
	.controller('ProjectController', ['$scope', '$location', '$routeParams', 'ProjectService', function($scope, $location, $routeParams, ProjectService) {
        if($routeParams.id == undefined) {
            $scope.projects = ProjectService.query();
            $scope.project = { lat: 19.4326, lon: -99.1332, UserId: 1};
        } else {
            $scope.project = ProjectService.get($routeParams.id);
        }
		
        //MapConfiguration
        $scope.mapConfig = {
            center: {
                lat: 19.4326, //22.17307753016668
                lon: -99.1332, //-100.9735108539462
                zoom: 5
            },
            projection: 'EPSG:4326'
        };   


        $scope.projectLocation = {};

        $scope.$watch('projectLocation', function(newVal) {
            if(newVal.address !== undefined) {
                $scope.project.location = newVal.display_name;
                $scope.project.country = newVal.address.country;
                $scope.project.state = newVal.address.state;
                $scope.project.city = newVal.address.city;
                $scope.project.postcode = newVal.address.postcode;
            }
        });

        $scope.createProject = function() {
            $scope.projects.push(ProjectService.save($scope.project));
            $location.path( "/projects" );
        };
        
	}]);