var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.User.findAll({
		include: [ models.Task ]
	}).then(function(users) {
		console.log(users);
		res.render('index', {
	  		title: 'Geospatial App',
	  		users: users
		});
	});
});

module.exports = router;
