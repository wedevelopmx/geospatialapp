angular.module('geospatial')
	.service('SectionService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.userAPI = 
		$resource('section/:sectionId', 
			{sectionId: '@id'}, { 
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }});
	
	this.query = function() {
		return self.userAPI.query();
	}
	
	this.get = function(id) {
		return self.userAPI.get({sectionId:id});
	}
	
	this.remove = function(id) {
		return self.userAPI.delete({sectionId:id});
	}
	
	this.update = function(id, object) {
		return self.userAPI.update({sectionId:id}, object);
	}
	
	this.save = function(object) {
		return self.userAPI.save({}, object);
	}

}]);	
