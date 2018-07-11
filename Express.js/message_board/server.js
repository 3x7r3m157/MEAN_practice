var express = require("express");
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const axios = require('axios');
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/yatzi', { useNewUrlParser: true }, function (err) {
    console.log()
})

var CommentSchema = new mongoose.Schema({
    text:  { type: String, required: true, minlength: 5, maxlength: 50},
    name:  { type: String, required: true, minlength: 5, maxlength: 50},
}, {timestamps: true });

var PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20},
    title:  { type: String, required: true, minlength: 5, maxlength: 20},
    text: { type: String, required: true, minlength: 5, maxlength: 100 },
    comment: [CommentSchema],
}, {timestamps: true });

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');

mongoose.Promise = global.Promise
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/static"))
app.use(session({
    secret: 'kingmonkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(request, response) {
    Post.find({}, function(err, post) {
        if (err) {
            console.log(err)
        }
        response.render('dashboard', {posts: post})
    })

})

app.post('/processpost', function(request, response) {
    postInstance = new Post()
    postInstance.name = request.body.name
    postInstance.title = request.body.title
    postInstance.text = request.body.text
    postInstance.save(function(err) {
        if (err) {
            // request.session.err = err
            // response.redirect('/')
        }
        console.log(postInstance)
        response.redirect('/')
    })
})

app.post('/processcomment/:post_id', function(request, response) {
    commentInstance = new Comment()
    commentInstance.name = request.body.name
    commentInstance.text = request.body.text
    commentInstance.save(function(err, comment) {
        if (err) {
            console.log(err)
        } else {
            Post.findByIdAndUpdate(request.params.post_id, {$push: {comment: comment} }, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                    response.redirect('/')
                }
            })
        }
    })
})

// Post.findOneByIdAndUpdate(request.params.post_id, {$push: {comment: request.body}}, function(err) {
//     if (err) {
//         request.session.err = err
//         response.redirect('/')
//     } else {
//         response.redirect('/')
//     }

app.listen(8000, function() {
    console.log('king me 8000')
})
