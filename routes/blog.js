var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var middleware = require('../middleware');



router.get('/blog', (req, res) => {
    //get blog post from DB
    Blog.find({}, function (err, allblogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('blogs/index', {
                blog: allblogs
            });
        }
    });
});

router.post('/blog', middleware.isLoggedIn, (req, res) => {
    // get data from the form
    var title = req.body.title;
    var name = req.body.name;
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {
        title: title,
        name: name,
        text: text,
        author: author
    };
    // create new blog post and save to DB
    Blog.create(newBlog, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to blog page
            console.log(newlyCreated);
            res.redirect('/blog');
        }
    });
});


router.get('/blog/new', middleware.isLoggedIn, (req, res) => {
    res.render('blogs/new');
});
router.get('/blog/:id/', (req, res) => {
    // find blog post with id
    Blog.findById(req.params.id).populate('comments').exec((err, foundBlog) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundBlog);
            // render the show template
            res.render('blogs/show', {
                blog: foundBlog
            });
        }
    });

});

// edit blog route
router.get('/blog/:id/edit', middleware.checkBlogOwner, function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        res.render('blogs/edit', {
            blog: foundBlog
        });

    });
});


// update blog route
router.put('/blog/:id', middleware.checkBlogOwner, function (req, res) {
    //find and update the current blog 
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.redirect('/blog/' + req.params.id);
        }
    });
});

// destroy blog route
router.delete('/blog/:id', middleware.checkBlogOwner, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/blog');
        } else {
            res.redirect('/blog');
        }
    });
});


module.exports = router;
