var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    name: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// model schema
module.exports = mongoose.model('Blog', blogSchema);
