var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/', function(req, res, next) {
		models.Survey.findAll({
			include: [ { model: models.Section, as: 'sections' } ] 
		}).then(function(surveys) {
			res.json(surveys);
		});
	})
	.get('/:id', function(req, res, next) {
		models.Survey.findOne({ 
				where: { id: req.params.id }, 
				include: [ { model: models.Section, as: 'sections' } ] 
			})
			.then(function(survey) {
			  	res.json(survey);
			});
	})
	.post('/', function(req, res, next) {
		console.log('Creating: ' + req.body.title );
		models.Survey
	      .findOrCreate({where: { title: req.body.title}, defaults: req.body})
	      .spread(function(survey, created) {
	        console.log(survey.get({
	          plain: true
	        }))
	        res.json(survey);
	      });
	});
	


module.exports = router;
