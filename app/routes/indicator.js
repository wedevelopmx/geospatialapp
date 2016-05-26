var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/', function(req, res, next) {
		models.Indicator.findAll({
			attributes: ['id', 'title']
		}).then(function(countries) {
			res.json(countries);
		});
	})
	.get('/:id', function(req, res, next) {
		//req.params.id
		models.Indicator.findOne({
			attributes: ['id', 'title'],
			include: [ { 
				attributes: ['id', 'name', 'order'],
				model: models.State, 
				through: {
				  attributes: ['value'],
			      model: models.Measurement
			    }
			} ],
			where: { id: req.params.id }
		}).then(function(indicator) {
			res.json(indicator);
		});
	});

module.exports = router;
