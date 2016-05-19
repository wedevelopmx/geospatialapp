angular.module('geospatial')
	.service('QuestionService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.userAPI = 
		$resource('question/:questionId', 
			{questionId: '@id'}, { 
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }});
	
	this.query = function() {
		return self.userAPI.query();
	}
	
	this.get = function(id) {
		return self.userAPI.get({surveyId:id});
	}
	
	this.remove = function(id) {
		return self.userAPI.delete({surveyId:id});
	}
	
	this.update = function(id, object) {
		return self.userAPI.update({surveyId:id}, object);
	}
	
	this.save = function(object) {
		return self.userAPI.save({}, object);
	}

}]);	
