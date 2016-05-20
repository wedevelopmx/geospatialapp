angular.module('geospatial')
	.directive('surveySection', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/survey/section-template.html',
			replace: true,
			transclude: true,
			scope: {
				section: '='
			},
			controller: ['$scope', '$interval', 'SectionService', function($scope, $interval, SectionService) {
				$scope.section.collapse = true;

				$scope.saveSection = function(){
					$scope.section.updating = true;

					SectionService.save($scope.section).$promise
		                .then(function(section) {
		                    console.log(section);
		                    $scope.section.updating = false;
		                    $scope.section.changed = false;
		                    $scope.section.id = section.id; 
		                    console.log($scope.section.title + ' has changed.');
		                });

				}

				//Saving changes
				$interval(function() {
					if($scope.section.changed){
						$scope.saveSection();
					}
				}, 10000);

				$scope.$watch('section.collapse', function(newVal) {
					if($scope.section.id !== undefined && newVal) {
						SectionService.get($scope.section.id).$promise
							.then(function(section) {
								$scope.section.questions = section.questions;
							});
					}
				}, true);


				$scope.sectionUpdate = function(section) {
					section.changed = true;
				}

				$scope.addQuestion = function(type) {
					$scope.section.questions.push({ 
						title: '',
						description: '',
						type: type,
						order: $scope.section.questions.length + 1,
						answers: [],
						SectionId: $scope.section.id,
						collapse: false
					});
				}

				$scope.addMultipleQuestion = function(section) {
					section.questions.push({ 
						title: '',
						description: '',
						type: 'selection-single',
						order: section.questions.length + 1,
						answers: [{title: 'Yes'}, {title: 'No'}],
						SectionId: section.id,
						collapse: false
					});
				}

				$scope.addSingleQuestion = function(section) {
					section.questions.push({ 
						title: '',
						description: '',
						type: 'text-input',
						order: section.questions.length + 1,
						answers: [{}],
						SectionId: section.id,
						collapse: false
					});
				}

			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


