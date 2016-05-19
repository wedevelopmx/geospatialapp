var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.post('/', function(req, res, next) {
		console.log('Creating: ' + req.body.title );
		models.Answer
	      .findOrCreate({
	      	where: { 
	      		title: req.body.title, 
	      		QuestionId: req.body.QuestionId
	      	}, defaults: req.body})
	      .spread(function(answer, created) {
	        console.log(answer.get({
	          plain: true
	        }))
	        res.json(answer);
	      });
	})
	.post('/:id', function(req, res, next) {
		console.log('Updating: ' + req.params.id );
		models.Answer
			.findOne({ 
				where: { id: req.params.id }
				// include: [ { model: models.answer, as: 'answers' } ] 
			})
			.then(function(answer) {
			  	answer.update(req.body).then(function(answer) {
			  		res.json(question);
			  	});
			});
	});

module.exports = router;
