angular.module('geospatial')
	.controller('SurveyController', ['$scope', '$routeParams', 'SurveyService', function($scope, $routeParams, SurveyService) {
		$scope.resetForm = function() {
        	$scope.activeForm = false;
        	$scope.survey = { UserId: $scope.user.id};
        };

		$scope.createSurvey = function() {
			console.log($scope.survey);
			SurveyService.save($scope.survey).$promise
                .then(function(survey) {
                    console.log(survey);
                    $scope.surveys.push(survey);
                    $scope.resetForm();
                });
			
		};

		$scope.addSection = function() {

            $scope.survey.sections.push({
                SurveyId: $scope.survey.id,
				order: $scope.survey.sections.length  + 1, 
				title: '',
				questions: [],
                changed: false,
				collapse: false
			});
		};

		if($routeParams.id == undefined) {
            SurveyService.query().$promise
            	.then(function(surveys) {
            		console.log(surveys);
            		$scope.surveys = surveys;
            	});
            $scope.resetForm();
        } else {
            SurveyService.get($routeParams.id).$promise
            	.then(function(survey) {
            		$scope.survey = survey;
                    console.log(survey);

            		$scope.section = {};
            	});
        }

	}]);