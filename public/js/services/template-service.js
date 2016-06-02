angular.module('geospatial')
	.service('TemplateService', ['$http', function($http) {
		var _self = this;

		_self.templates = {
			'project-popup': null,
			'state-popup': null
		};

		for(templateName in _self.templates) {
			$http({
			  method: 'GET',
			  url: '/template/partials/' + templateName + '.html'
			}).then(function successCallback(response) {
			    _self.templates[templateName] = response.data;
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
		}


		this.compileTemplate = function(templateName, data) {
			var template = _.template(_self.templates[templateName]);
			//console.log(_self.templates[templateName]);
			return template(data);
		};
	}]);