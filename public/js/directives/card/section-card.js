angular.module('geospatial')
	.directive('sectionCard', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/card/section-card.html',
			replace: true,
			transclude: true,
			scope: {
				psi: '=',
				section: '='
			},
			controller: ['$scope', '$interval', 'SectionService', function($scope, $interval, SectionService) {

			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


