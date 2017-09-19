"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
var BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var quotes = [{
        title: "Awesome quote",
        description: 'This is an awesome quote made by lasse',
        rating: 2,
        date: new Date("Wed Sep 20 2017")
    },
    {
        title: "Awesome quote2",
        description: 'This is an awesome quote 2 made by lasse',
        rating: 3,
        date: new Date("2017-09-18")
    },
    {
        title: "Awesome quote3",
        description: 'This is an awesome quote 2 made by lasse',
        rating: 1,
        date: new Date("2017-09-19")
    }];
app.post("/quotes/:id/downvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";
    resp.json(result);
});
app.post("/quotes/:id/upvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";
    resp.json(result);
});
app.post("/quotes/:id/delete", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";
    resp.json(result);
});
app.post("/quotes/add", function (req, resp) {
    var title = req.body.title;
    var description = req.body.description;
    var rating = 0;
    var date = new Date();
    quotes.push({ title: title, description: description, rating: rating, date: date });
    var result = "added";
    resp.json(result);
});
app.post("/quotes/show/:id", function (req, resp) {
    var result;
    var id = req.params.id;
    result = quotes[id];
    resp.json(result);
});
app.post("/quotes", function (req, resp) {
    var result;
    result = quotes;
    resp.json(result);
});
app.post("/quotes/highestrated", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return b.rating > a.rating ? 1 : -1; });
    result = quotes;
    resp.json(result);
});
app.post("/quotes/newest", function (req, resp) {
    var result;
    quotes.sort(function (a, b) { return a.date - b.date; });
    result = quotes;
    resp.json(result);
});
console.log("server listing on port 3000");
app.listen(3000);
