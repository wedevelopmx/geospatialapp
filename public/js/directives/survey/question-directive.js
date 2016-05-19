angular.module('geospatial')
	.directive('question', function() {
		return {
			restrict: 'E',
			templateUrl: 'template/directives/survey/question-template.html',
			replace: true,
			transclude: true,
			scope: {
				section: '=',
				question: '='
			},
			controller: ['$scope', '$interval', 'QuestionService', function($scope, $interval, QuestionService) {

				$scope.saveQuestion = function() {
					$scope.question.updating = true;
					QuestionService.save($scope.question).$promise
		                .then(function(question) {
		                    console.log(question);
		                    $scope.question.updating = false;
		                    $scope.question.changed = false;
		                    $scope.question.id = question.id; 
		                    console.log($scope.question.title + ' has changed.');
		                });
				}

				//Saving changes
				$interval(function() {
					if($scope.question.changed){ 
						$scope.saveQuestion();
					}
				}, 10000);


				$scope.$watch('question.collapse', function(newVal) {
					if(newVal) {
						QuestionService.get($scope.question.id).$promise
							.then(function(question) {
								$scope.question.questions = question.questions;
							});
					}
				}, true);

				$scope.questionUpdate = function(question) {
					$scope.question.changed = true;
				}

				$scope.addAnswer = function(question) {
					$scope.question.answers.push({
						QuestionId: $scope.question.id
					});
					console.log($scope.question.answers);
				}
			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


