angular.module('geospatial')
	.service('CountryService', [ '$resource', function($resource) {
	
	var self = this;
	
	this.countryAPI = 
		$resource('country/:countryId', {countryId: '@id'}, { 
			update: { method: 'PUT' }, 
			delete: { method: 'DELETE', isArray: true }});
	
	this.query = function() {
		return self.countryAPI.query();
	}
	
	this.get = function(id) {
		return self.countryAPI.get({countryId:id});
	}
	
	this.remove = function(id) {
		return self.countryAPI.delete({countryId:id});
	}
	
	this.update = function(id, object) {
		return self.countryAPI.update({countryId:id}, object);
	}
	
	this.save = function(object) {
		return self.countryAPI.save({}, object);
	}

}]);	
