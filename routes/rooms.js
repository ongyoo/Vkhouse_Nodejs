var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var rooms = require('../models/Room');

var sess;
/* GET home page. */
router.get('/', function(req, res) {
	sess = req.session;
	if (sess.authen && sess.authen._id) {
		rooms.find(function (err, roomData) {
    if (err) return next(err);
    console.log('sess.authen :' + sess.authen.firstName);
		console.log('sess.msg :' + sess.msg);
		res.render('room', { roomItems: roomData, items: sess.msg, firstName: sess.authen.firstName, lastName: sess.authen.lastName, active: sess.authen.active, email: sess.authen.email, avatar: sess.authen.avatar_Url, role: sess.authen.role});
  });
	} else {
		res.redirect('/login');
	}
});

/* POST /todos */
router.post('/', function(req, res, next) {
  rooms.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  sess = req.session;
	if (sess.authen && sess.authen._id) {
		rooms.findOne({'room_id': req.params.id}, req.body, function (err, post) {
    if (err) return next(err);
		res.render('roomEdit', { roomItem: post, items: sess.msg, firstName: sess.authen.firstName, lastName: sess.authen.lastName, active: sess.authen.active, email: sess.authen.email, avatar: sess.authen.avatar_Url, role: sess.authen.role});
  });
	} else {
		res.redirect('/login');
	}

});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  rooms.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  rooms.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
