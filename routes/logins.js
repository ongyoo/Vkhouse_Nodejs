var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = require('../models/User');

var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	if (sess.authen) {
		res.redirect('/main');
	} else {
		res.redirect('/login/authen/error');
	}
});

router.post('/', function(req, res, next) {
	sess = req.session;
	console.log('successful Post :' + req.body.email);
	user.findOne({'email': req.body.email, 'password': req.body.password}, function (err, user) {
		if (err) return next(err);
		if (user) {
			sess.authen = user;
			res.redirect('/main');
		} else {
			res.redirect('/login');
		}
	});
});

router.get('/authen/error', function(req, res, next) {
	res.render('login');
});

// GET SignOut
router.get('/signout', function(req, res, next) {
	sess = req.session;
	req.body.active = false;
	user.findByIdAndUpdate(sess.authen._id, req.body, function (err, post) {
		if (err) return next(err);
		req.session.destroy();
		res.render('login');
	});
});


module.exports = router;
