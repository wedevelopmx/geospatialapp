angular.module('geospatial')
	.directive('surveycard', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/directives/card/survey-card.html',
			replace: true,
			transclude: true,
			scope: {
				project: '=',
				survey: '='
			},
			controller: ['$scope', '$http', function($scope, $http) {
				var colors = ['#F44336', '#03A9F4', '#8BC34A'];
				$http.get('/project/' + $scope.project.id + '/survey/' + $scope.survey.id + '/summary')
				.then(function(res) {
					$scope.pieData = [];
					res.data.submitedSurveys.forEach(function(obj, index) {
						console.log(obj);
						$scope.pieData.push({
							data: parseInt(obj.qno),
							label: obj.state,
							color: colors[index]
						});	
					})

					if($('#donut-chart-' + $scope.survey.id)[0]){
	                    $.plot('#donut-chart-' + $scope.survey.id, $scope.pieData, {
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
	                            container: '.flc-donut-' + $scope.survey.id,
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

				if ($(".flot-chart-pie")[0]) {
                    $(".flot-chart-pie").bind("plothover", function (event, pos, item) {
                    	console.log(item);
                        // if (item) {
                        //     var x = item.datapoint[0],
                        //         y = item.datapoint[1].toFixed(2);
                        //     $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
                        // }
                        // else {
                        //     $(".flot-tooltip").hide();
                        // }
                    });

                    $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                }

				// var pieData = [
    //                 {data: 1, color: '#F44336', label: 'Toyota'},
    //                 {data: 2, color: '#03A9F4', label: 'Nissan'},
    //                 {data: 3, color: '#8BC34A', label: 'Hyundai'},
    //                 {data: 4, color: '#FFEB3B', label: 'Scion'},
    //                 {data: 4, color: '#009688', label: 'Daihatsu'},
    //             ];

				

			}],
			link: function(scope, elem, attrs) {
				
			}
		};
	});


