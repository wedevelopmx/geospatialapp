angular.module('geospatial')
	.controller('MainController', ['$scope', function($scope){
		$scope.toggleSidebar = function() {
			if($('#sidebar').hasClass('toggled'))
				$('#sidebar').removeClass('toggled')
			else
				$('#sidebar').addClass('toggled')
		};
	}]);