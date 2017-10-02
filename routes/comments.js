var express = require('express');
var router = express.Router();

var Blog = require('../models/blog');
var Comment = require('../models/comment');
var middleware = require('../middleware/');



router.get('/blog/:id/comments/new', middleware.isLoggedIn, function (req, res) {
    // find blog by id
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {
                blog: blog
            });
        }
    });
});

router.post('/blog/:id/comments', middleware.isLoggedIn, (req, res) => {
    // look for blog post by id
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            console.log(err);
            res.redirect('/blog');
        } else {
            // create new comments
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash('error', 'Something went wrong!');
                    console.log(err);
                } else {
                    //add username and id 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    // redirect to blog show page
                    console.log(comment);
                    req.flash('success', 'Comment added!');
                    res.redirect('/blog/' + blog._id);
                }
            });
        }
    });
});

// comment edit route
router.get('/blog/:id/comments/:comment_id/edit', middleware.checkCommentOwner, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {
                blog_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// comment update route
router.put('/blog/:id/comments/:comment_id', middleware.checkCommentOwner, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});


// comment destroy route
router.delete('/blog/:id/comments/:comment_id', middleware.checkCommentOwner, function (req, res) {
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});


module.exports = router;
