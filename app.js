// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var Blog = require('./models/blog');
var User = require('./models/user');
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var port = app.listen(process.env.PORT || 3000, function(){
    console.log('server started');
});


// require routes
var commentRoutes = require('./routes/comments');
var blogRoutes = require('./routes/blog');
var authRoutes = require('./routes/index');



//mongoose.connect('mongodb://localhost/blog');
mongoose.connect('mongodb://swamifalgun:********@ds117189.mlab.com:17189/swamifalgundatabase');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//seedDB();


// passport configuration
app.use(require('express-session')({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(authRoutes);
app.use(commentRoutes);
app.use(blogRoutes);


// Server 
//app.listen(3000, function () {
  //  console.log("Server running on port " + 3000);
//});
app.listen(port);
