angular.module('geospatial')
	.controller('TeamController', ['$scope', 'TeamService' ,function($scope, TeamService) {
		$scope.team = TeamService.query();
		$scope.user = {};
		$scope.createUser = function() {
			$scope.team.push(TeamService.save($scope.user));
			
		};
	}]);