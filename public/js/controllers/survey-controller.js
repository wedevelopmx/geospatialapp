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
            		//Single text box, multiple choice, matrix
            		// $scope.survey.sections = [
            		// 	{ id: 1, order: 1, title: 'Caracteristicas general del hogar',
            		// 		questions: [
            		// 			{ id: 1, order: 1, title: 'Question #1', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 2, order: 2,  title: 'Question #2', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 3, order: 3,  title: 'Question #3', type: 'multiple', checkbox: false, answers: 'A|B|C|D' }
            		// 		]
            		// 	},
            		// 	{ id: 2, order: 2, title: 'Datos de la vivienda',
            		// 		questions: [
            		// 			{ id: 1, order: 1,  title: 'Question #1', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 2, order: 2,  title: 'Question #2', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 3, order: 3,  title: 'Question #3', type: 'multiple', checkbox: false, answers: 'A|B|C|D' }
            		// 		]
            		// 	},
            		// 	{ id: 3, order: 3, title: 'Educacion',
            		// 		questions: [
            		// 			{ id: 1, order: 1,  title: 'Question #1', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 2, order: 2,  title: 'Question #2', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 3, order: 3,  title: 'Question #3', type: 'multiple', checkbox: false, answers: 'A|B|C|D' }
            		// 		]
            		// 	},
            		// 	{ id: 4, order: 4, title: 'Salud',
            		// 		questions: [
            		// 			{ id: 1, order: 1,  title: 'Question #1', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 2, order: 2,  title: 'Question #2', type: 'multiple', checkbox: false, answers: 'A|B|C|D' },
            		// 			{ id: 3, order: 3,  title: 'Question #3', type: 'multiple', checkbox: false, answers: 'A|B|C|D' }
            		// 		]
            		// 	}
            		// ];

            		$scope.section = {};
            	});
        }

	}]);