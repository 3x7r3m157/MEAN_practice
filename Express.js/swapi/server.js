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

@app.get('/people', function(req, res){
    axios.get(url)
    .then(data => {
        // log the data before moving on!
        console.log(data);
        // rather than rendering, just send back the json data!
        res.json(data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    })
});

app.post('/processcounter', function(request, response) {
    //do stuff
    response.redirect('/')
})

app.listen(8000, function() {
    console.log('king me 8000')
})
