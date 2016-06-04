angular.module('geospatial')
	.controller('ProjectSurveyController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		$scope.projectSurveyId = $routeParams.id;

		$http.get('/project/projectSurvey/' + $scope.projectSurveyId)
			.then(function(res) {
				$scope.surveyId = res.data.SurveyId;
				$http.get('/api/survey/' + $scope.surveyId)
					.then(function(res) {
						$scope.survey = res.data;
					});

			});

	}]);