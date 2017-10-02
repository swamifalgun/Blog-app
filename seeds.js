var mongoose = require('mongoose');
var Blog = require('./models/blog');
var Comment = require('./models/comment');

var data = [];


function seedDB() {
    // remove all blog post
    Blog.remove({}, function (err) {
        /* if (err) {
             console.log('err');
         }
         console.log('all blog removed from db');
         // add few blog posts
         data.forEach(function (seed) {
             Blog.create(seed, function (err, data) {
                 if (err) {
                     console.log(err);
                 } else {
                     console.log('added a blog');
                     // create a comment
                     Comment.create({
                         text: 'falgun swami sounds interesting',
                         author: 'anonymous'
                     }, function (err, comment) {
                         if (err) {
                             console.log(err);
                         } else {
                             Blog.comments.push(comment);
                             Blog.save();
                             console.log('created new comment');
                         }

                     });
                 }
             });
         });*/
    });


}
module.exports = seedDB;
