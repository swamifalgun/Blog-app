var Blog = require('../models/blog');
var Comment = require('../models/comment');

// middleware go here
var middlewareObj = {};

// middleware to check blog owner
middlewareObj.checkBlogOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, function (err, foundBlog) {
            if (err) {
                req.flash('error', 'Post not found!');
                res.redirect('back');
            } else {
                //if user logged in , does user own the blog post

                if (foundBlog.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Request denied!')
                    res.redirect('back');
                }
            }
        });
    } else {
        res.flash('error', 'You need to be logged in to do that!');
        res.redirect('back'); //sends the user back to the webpage they came from
    }
};

// middleware to check comment owner
middlewareObj.checkCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect('back');
            } else {
                //if user logged in , does user own the comment post

                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Permission denied!')
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in!');
        res.redirect('back'); //sends the user back to the webpage they came from
    }
};


// middlewarwe to check if logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!')
    res.redirect('/login');
};


module.exports = middlewareObj;
