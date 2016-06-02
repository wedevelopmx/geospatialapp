var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/', function(req, res, next) {
		models.Country.findAll({
			attributes: [ 'id', 'name'],
			include: [ { 
				model: models.State, 
				as: 'states',
				attributes: [ 'id', 'name', 'order', 'lat', 'lon']
			} ]
		}).then(function(countries) {
			res.json(countries);
		});
	});

module.exports = router;
