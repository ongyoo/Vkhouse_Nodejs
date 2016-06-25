  var express = require('express');
  var router = express.Router();

  var mongoose = require('mongoose');
  var User = require('../models/User');
  var Message = require('../models/Message');

  var sess;
  /* GET home page. */
  router.get('/', function(req, res) {
  	sess = req.session;
    if (sess.authen && sess.authen._id) {
      console.log('sess.authen :' + sess.authen.firstName);
      Message.find(function (err, messages) {
        if (err) return next(err);
        User.findById(sess.authen._id, function (err, users) {
          if (err) return next(err);
          if (messages.length > 0) {
            sess.msg = messages;
          } else {
            sess.msg = [];
          }
          res.render('main', { items: messages, firstName: users.firstName, lastName: users.lastName, active: users.active, email: users.email, avatar: users.avatar_Url, role: users.role});
          console.log('messages successful Data :' + messages);
        });
        console.log('messages successful Data :' + messages);
      });
    } else {
      res.redirect('/login');
    }
  });

  module.exports = router;