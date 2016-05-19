var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/:id', function(req, res, next) {
		models.Section.findOne({ 
				where: { id: req.params.id }, 
				include: [ { 
					model: models.Question, 
					as: 'questions',
					include: [ { 
						model: models.Answer, 
						as: 'answers'
					} ]
				} ] 
			})
			.then(function(section) {
			  	res.json(section);
			});
	})
	.post('/', function(req, res, next) {
		console.log('Creating: ' + req.body.title );
		models.Section
	      .findOrCreate({where: { title: req.body.title}, defaults: req.body})
	      .spread(function(section, created) {
	        console.log(section.get({
	          plain: true
	        }))
	        res.json(section);
	      });
	})
	.post('/:id', function(req, res, next) {
		console.log('Updating: ' + req.params.id );
		models.Section.findOne({ 
				where: { id: req.params.id }
				// include: [ { model: models.Section, as: 'sections' } ] 
			})
			.then(function(section) {
			  	section.update(req.body).then(function(section) {
			  		res.json(section);
			  	});
			});
	});

module.exports = router;
