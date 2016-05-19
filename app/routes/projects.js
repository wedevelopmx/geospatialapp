var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router
	.get('/', function(req, res, next) {
		models.Project.findAll({
			include: [ models.User ]
		}).then(function(projects) {
			res.json(projects);
		});
	})
	.get('/:id', function(req, res, next) {
		models.Project.findOne({ where: {id: req.params.id}, include: [ models.User ] })
		.then(function(project) {
		  res.json(project);
		});
	})
	.post('/', function(req, res, next) {
		models.Project
	      .findOrCreate({where: { title: req.body.title}, defaults: req.body})
	      .spread(function(project, created) {
	        console.log(project.get({
	          plain: true
	        }))
	        res.json(project);
	      });
	});


module.exports = router;
