angular.module('geospatial')
	.service('IndicatorService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.indicatorAPI = 
		$resource('indicator/:indicatorId', {indicatorId: '@id'}, { 
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }});
	
	this.query = function() {
		return self.indicatorAPI.query();
	}
	
	this.get = function(id) {
		return self.indicatorAPI.get({indicatorId:id});
	}
	
	this.remove = function(id) {
		return self.indicatorAPI.delete({indicatorId:id});
	}
	
	this.update = function(id, object) {
		return self.indicatorAPI.update({indicatorId:id}, object);
	}
	
	this.save = function(object) {
		return self.indicatorAPI.save({}, object);
	}

}]);	
