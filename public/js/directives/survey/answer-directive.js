angular.module('geospatial')
	.directive('answer', function() {
		return {
			restrict: 'E',
			templateUrl: 'template/directives/survey/answer-template.html',
			replace: true,
			transclude: true,
			scope: {
				question: '=',
				answer: '='
			},
			controller: ['$scope', '$interval', 'AnswerService', function($scope, $interval, AnswerService) {
				$scope.answer.QuestionId = $scope.question.id;
				
				//Saving changes
				$interval(function() {
					if($scope.answer.changed && $scope.answer.QuestionId != undefined){
						$scope.answer.updating = true;
						//Si answer.id != undefined
						AnswerService.save($scope.answer).$promise
			                .then(function(answer) {
			                    console.log(answer);
			                    $scope.answer.updating = false;
			                    $scope.answer.changed = false;
			                    $scope.answer.id = answer.id; 
			                    console.log($scope.answer.title + ' has changed.');
			                });
					}
				}, 10000);

				$scope.answerUpdate = function(answer) {
					$scope.answer.changed = true;
				}
			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


