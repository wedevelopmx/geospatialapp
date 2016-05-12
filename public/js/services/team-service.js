angular.module('geospatial')
	.service('TeamService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.userAPI = 
		$resource('user/:userId', {userId: '@id'}, { 
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }});
	
	this.query = function() {
		console.log('query');
		return self.userAPI.query();
	}
	
	this.get = function(id) {
		return self.userAPI.get({userId:id});
	}
	
	this.remove = function(id) {
		return self.userAPI.delete({userId:id});
	}
	
	this.update = function(id, object) {
		return self.userAPI.update({userId:id}, object);
	}
	
	this.save = function(object) {
		return self.userAPI.save({}, object);
	}

}]);	
