var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');

// add root route
router.get('/', (req, res) => {
    res.render('cover');
});

// auth routes

// show register form 
router.get('/register', function (req, res) {
    res.render('register');
});

//handle signup
router.post('/register', function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }

        passport.authenticate('loca')(req, res, function () {
            req.flash('success', 'Welcome,' + user.username + 'start posting!');
            res.redirect('/blog');
        });
    });
});

// show login form
router.get('/login', function (req, res) {
    res.render('login');
});

// handle login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/blog',
    failureRedirect: '/login'
}), function (req, res) {

});


//logout route
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/blog');
});


module.exports = router;
