var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.post('/', function(req, res, next) {
		console.log('Creating: ' + req.body.title );
		models.Question
	      .findOrCreate({where: { title: req.body.title}, defaults: req.body})
	      .spread(function(question, created) {
	        console.log(question.get({
	          plain: true
	        }))
	        res.json(question);
	      });
	})
	.post('/:id', function(req, res, next) {
		console.log('Updating: ' + req.params.id );
		models.Question.findOne({ 
				where: { id: req.params.id }
				// include: [ { model: models.question, as: 'questions' } ] 
			})
			.then(function(question) {
			  	question.update(req.body).then(function(question) {
			  		res.json(question);
			  	});
			});
	});

module.exports = router;
