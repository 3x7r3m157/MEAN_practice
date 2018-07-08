var express = require("express");
var app = express();

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function (request, response) {
    response.render("cats")
})
app.get("/cats", function (request, response) {
    var kitty_arr = [
        {name: "Zues", age: "2", href: "/cats/zues"},
        {name: "Scarlet", age: "3", href: "/cats/scarlet"},
        {name: "Saphire", age: "1", href: "/cats/saphire"},
    ];
    response.render("cats", {cats: kitty_arr})
})
app.get("/cats/zues", function (request, response) {
    console.log('hit zues')
    var kitty_arr = [
        {name: "Zues", age: "2", hobbies: "Head big boss of catnip cartel, loves the finer things in life", favetoys: ['catnip', 'whiskey', 'gold mc-hammer pants']},
    ]
    response.render("cats", {kitties: kitty_arr})
})
app.get("/cats/scarlet", function (request, response) {
    console.log('hit scarlet')
    var kitty_arr = [
        {name: "Scarlet", age: "3", hobbies: "Misunderstood weird artist, loves to hang in the background and paint", favetoys: ['catnip', 'whiskey', 'gold mc-hammer pants']},
    ]
    response.render("cats", {kitties: kitty_arr})
})
app.get("/cats/saphire", function (request, response) {
    console.log('hit saphire')
    var kitty_arr = [
        {name: "Saphire", age: "1", hobbies: "Chunky little thing that has no talents other than running real slow and cuddling", favetoys: ['catnip', 'whiskey', 'gold mc-hammer pants']},
    ]
    response.render("cats", {kitties: kitty_arr})
})
app.listen(8000, function() {
    console.log('yatzi 8000')
})
