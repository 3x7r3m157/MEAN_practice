var express = require("express");
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const ejsLint = require('ejs-lint');
const axios = require('axios');
var app = express();

mongoose.Promise = global.Promise
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

// mongoose.connect('mongodb://localhost/yatzi');
mongoose.connect('mongodb://127.0.0.1:27017/yatzi', { useNewUrlParser: true }, function (err) {
    console.log()
})

var QuoteSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2},
    quote: { type: String, required: true, maxlength: 30 },
}, {timestamps: true });

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/static"))
app.use(session({
    secret: 'kingmonkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/showform', function(request, response) {

    response.render('showform')
})

app.get('/showquotes', function(request, response) {
    Quote.find({}, function(err, data) {
        if (err) {
            console.log('You need a different career')
        } else {
        response.render('showquotes', {quotes: data})
        }
    })
})

app.post('/processquote', function(request, response) {
    var quoteInstance = new Quote()
    quoteInstance.name = request.body.name
    quoteInstance.quote = request.body.quote
    console.log(quoteInstance.name, quoteInstance.quote)
    quoteInstance.save(function(err){
        console.log(err)
    })
    response.redirect('showquotes')
})


app.listen(8000, function() {
    console.log('king me 8000')
})
