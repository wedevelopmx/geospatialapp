angular.module('geospatial')
	.directive('questionCard', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/card/question-card.html',
			replace: true,
			transclude: true,
			scope: {
				psi: '=',
				section: '=',
				question: '='
			},
			controller: ['$scope', '$http', function($scope, $http) {
				var colors = ['#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00', '#008000', '#00FFFF', '#008080', '#0000FF', '#000080', '#FF00FF', '#800080'];

				$http.get('project/projectSurvey/' + $scope.psi + '/question/' + $scope.question.id)
					.then(function(res) {
						//Parse data into donut Array
						$scope.pieData = [];
						res.data.forEach(function(data, index) {
							data.submitedQuestions.forEach(function(count) {
								console.log(count.Answer.title + ' ' + count.qno);
								$scope.pieData.push({
									data: parseInt(count.qno),
									label: count.Answer.title,
									color: colors[index]
								});	
							});
						});

						if($('#donut-chart-' + $scope.question.id)[0]){
		                    $.plot('#donut-chart-' + $scope.question.id , $scope.pieData, {
		                        series: {
		                            pie: {
		                                innerRadius: 0.5,
		                                show: true,
		                                stroke: { 
		                                    width: 2,
		                                },
		                            },
		                        },
		                        legend: {
		                            container: '.flc-donut-' + $scope.question.id,
		                            backgroundOpacity: 0.5,
		                            noColumns: 0,
		                            backgroundColor: "white",
		                            lineWidth: 0
		                        },
		                        grid: {
		                            hoverable: true,
		                            clickable: true
		                        },
		                        tooltip: true,
		                        tooltipOpts: {
		                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
		                            shifts: {
		                                x: 20,
		                                y: 0
		                            },
		                            defaultTheme: false,
		                            cssClass: 'flot-tooltip'
		                        }

		                    });
		                }


					});
			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


