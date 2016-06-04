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
		models.Project.findOne({ 
			where: {id: req.params.id}, 
			include: [{
				attributes: ['id', 'title', 'description'],
				model: models.Survey,
				through: {
				  attributes: ['id', 'status'],
			      model: models.ProjectSurvey
			    }
			}, {
				model: models.User
			}]
		})
		.then(function(project) {
		  	res.json(project);
		});
	})
	.get('/:id/survey/:surveyId/summary', function(req, res, next) {
		models.ProjectSurvey.findAll({ 
			where: {
				ProjectId: req.params.id,
				SurveyId: req.params.surveyId
			},
			attributes: ['id', 'status'],
			include: [{ 
				model: models.SubmitedSurvey,
				as: 'submitedSurveys',
				attributes: ['state',
					[models.sequelize.fn('COUNT', models.sequelize.col('submitedSurveys.state')), 'qno']]
			}],
			group: 'submitedSurveys.state'
		})
		.then(function(projects) {
		  res.json(projects[0]);
		});
	})
	.get('/projectSurvey/:id', function(req, res, next) {
		models.ProjectSurvey.findOne({ 
			where: { id: req.params.id },
			attributes: ['id', 'status', 'ProjectId', 'SurveyId']
		})
		.then(function(survey) {
		  	res.json(survey);
		});
	})
	.get('/projectSurvey/:projectSurveyId/question/:questionId', function(req, res, next) {
		models.SubmitedSurvey.findAll({
			where: { ProjectSurveyId: req.params.projectSurveyId },
			attributes: [],
			include: [{
				attributes: [[models.sequelize.fn('COUNT', models.sequelize.col('submitedQuestions.AnswerId')), 'qno']],
				model: models.SubmitedQuestion,
				as: 'submitedQuestions',
				where: { QuestionId: req.params.questionId },
				include: [{
					attributes: ['id', 'title'],
					model: models.Answer,
				}]
			}],
			group: 'submitedQuestions.AnswerId'
		}).then(function(submitedSurveys) {
			res.json(submitedSurveys);
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
