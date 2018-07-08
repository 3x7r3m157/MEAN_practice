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
    response.render('index')
})

app.post('/process', function(request, response) {
    request.session.name = request.body.name
    request.session.location = request.body.location
    request.session.favoritelanguage = request.body.favoritelanguage
    request.session.comments = request.body.comments
    console.log(request.session.location)
    response.redirect('result')
})

app.get('/result', function(request, response) {
    arr = [
        {'name': request.session.name},
        {'location': request.session.location},
        {'favoritelanguage': request.session.favoritelanguage},
        {'comments': request.session.comments},
    ]
    console.log(arr)
    response.render('result', {result: arr})
})

app.listen(8000, function() {
    console.log('king me 8000')
})
