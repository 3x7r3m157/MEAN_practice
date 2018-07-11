var express = require("express");
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const axios = require('axios');
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/yatzi', { useNewUrlParser: true }, function (err) {
    console.log()
})

mongoose.Promise = global.Promise
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

var MonkeySchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
    age: { type: Number, required: true, max: 100 },
    favoritehobbies: { type: String, min: 1, maxlength: 150 },
}, {timestamps: true });

mongoose.model('Monkey', MonkeySchema);
var Monkey = mongoose.model('Monkey');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/static"))
app.use(session({
    secret: 'kingmonkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(request, response) {
    Monkey.find({}, function(err, monkeys) {
        if (err) {
            errarr = [err]
            response.render('index', {errors: errarr})
        } else {
            response.render('index', {monkeys: monkeys})
        }
    })
})

//CREATE NEW MONKEY GET/POST ROUTES:

app.get('/newmonkey', function(request, response) {
    response.render('newmonkey');
})

app.post('/processnewmonkey', function(request, response) {
    var monkeyInstance = new Monkey()
    monkeyInstance.name = request.body.name
    monkeyInstance.age = request.body.age
    monkeyInstance.favoritehobbies = request.body.favoritehobbies
    monkeyInstance.save(function(err){
        if (err) {
            request.session.err = err
            response.redirect('/')
        } else {
            response.redirect('/')
        }
    })
})

//  SHOW INDIVIDUAL MONKEY GET ROUTE:

app.get('/monkeys/:id', function(request, response) {
    Monkey.findById(request.params.id, function(err, monkey) {
        if (err) {
            request.session.err = err
            response.render('showmonkey', {monkey: monkey})
            console.log('errorful', monkey)
        } else {
            response.render('showmonkey', {monkey: monkey})
            console.log('successful', monkey)
        }
    })
})

//EDIT MONKEY GET/POST ROUTES:

app.get('/editmonkey/:id', function(request, response) {
    Monkey.findById(request.params.id, function(err, monkey) {
        if (err) {
            request.session.err = err
            response.render('editmonkey', {monkey: monkey})
        } else {
            response.render('editmonkey', {monkey: monkey})
        }
    })
})

app.post('/processeditmonkey', function(request, response) {
    Monkey.findById(request.body.id, function(err, monkey) {
        monkey.name = request.body.name
        monkey.age = request.body.age
        monkey.favoritehobbies = request.body.favoritehobbies
        monkey.save(function(err){
            if (err) {
                request.session.err = err
                response.redirect('/')
            } else {
                response.redirect('/')
            }
        })
    })
})

//DELETE MONKEY POST ROUTE:

app.get('/delete/:id', function(request, response) {
    console.log('hit delete')
    Monkey.findByIdAndRemove(request.params.id).then(function(data) {
        response.redirect('/')
    })
})

app.listen(8000, function() {
    console.log('king me 8000')
})
