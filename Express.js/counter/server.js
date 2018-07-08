var express = require("express");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

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
    if (!request.session.counter) {
        request.session.counter = 0
    }
    counterarr = [
        {'counter': request.session.counter}
    ]
    console.log(counterarr)
    response.render('index', {index: counterarr})
})

app.post('/processcounter', function(request, response) {
    request.session.counter ++
    console.log(request.session.counter)
    response.redirect('/')
})

app.post('/doublecounter', function(request, response) {
    request.session.counter += 2
    console.log(request.session.counter)
    response.redirect('/')
})

app.post('/resetcounter', function(request, response) {
    request.session.counter = 0
    console.log(request.session.counter)
    response.redirect('/')
})

app.listen(8000, function() {
    console.log('king me 8000')
})
