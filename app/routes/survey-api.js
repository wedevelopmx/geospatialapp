var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/', function(req, res, next) {
		models.Survey.findAll({
			attributes: ['id', 'title', 'description']
		}).then(function(surveys) {
			res.json(surveys);
		});
	})
	.get('/:id', function(req, res, next) {
		models.Survey.findOne({ 
			where: { id: req.params.id }, 
			include: [ { 
				model: models.Section, 
				as: 'sections',
				attributes: ['id', 'title', 'description', 'order'],
				include: [{ 
					model: models.Question, 
					as: 'questions',
					attributes: ['id', 'title', 'description', 'order','type'],
					include: [{
						model: models.Answer,
						as: 'answers',
						attributes: ['id', 'title', 'type', 'order']
					}]
				}]
			} ] 
		})
		.then(function(survey) {
		  	res.json(survey);
		});
	});
	


module.exports = router;
