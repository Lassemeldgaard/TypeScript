"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
var BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var HTTP = require("http-status-codes");
var hal_1 = require("hal");
app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-with,Content-type, Accept");
    next();
});
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
//ET endpoint for hver resource
app.put("/quotes/:id/downvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";
    resp.status(HTTP.OK).send(result);
});
app.put("/quotes/:id/upvote", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";
    resp.status(HTTP.OK).send(result);
});
app.delete("/quotes/:id/", function (req, resp) {
    var result;
    var id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";
    resp.status(HTTP.NO_CONTENT).send(result);
});
app.post("/quotes", function (req, resp) {
    var title = req.body.title;
    var description = req.body.description;
    var rating = 0;
    var date = new Date();
    quotes.push({ title: title, description: description, rating: rating, date: date });
    var result = "added";
    resp.status(HTTP.CREATED).send(result);
});
app.get("/quotes/list", function (req, resp) {
    var result = new hal_1.Resource({}, "/quotes/list");
    for (var i = 0; i < quotes.length; i++) {
        var title = quotes[i].title;
        var quote = new hal_1.Resource({ title: title }, "/quotes/" + i);
        result.link(quotes[i].title, "/quotes/" + i);
        result.embed("quotes", quote);
    }
    resp.status(HTTP.OK).json(result);
});
app.get("/quotes/highestrated", function (req, resp) {
    var result = new hal_1.Resource({}, "/quotes/highestrated");
    quotes.sort(function (a, b) { return b.rating > a.rating ? 1 : -1; });
    for (var i = 0; i < quotes.length; i++) {
        var title = quotes[i].title;
        var description = quotes[i].description;
        var rating = quotes[i].rating;
        var date = quotes[i].date;
        var quote = new hal_1.Resource({ title: title, description: description, rating: rating, date: date }, "/quotes/" + i);
        result.link(quotes[i].title, "/quotes/" + i);
        result.embed("quotes", quote);
    }
    resp.status(HTTP.OK).send(result);
});
app.get("/quotes/newest", function (req, resp) {
    var result = new hal_1.Resource({}, "/quotes/newest");
    quotes.sort(function (a, b) { return b.date - a.date; });
    for (var i = 0; i < quotes.length; i++) {
        var title = quotes[i].title;
        var description = quotes[i].description;
        var rating = quotes[i].rating;
        var date = quotes[i].date;
        var quote = new hal_1.Resource({ title: title, description: description, rating: rating, date: date }, "/quotes/" + i);
        result.link(quotes[i].title, "/quotes/" + i);
        result.embed("quotes", quote);
    }
    resp.status(HTTP.OK).send(result);
});
app.get("/quotes/:id", function (req, resp) {
    var id = req.params.id;
    var result = new hal_1.Resource(quotes[req.params], "/quotes/" + id);
    result.link("Quote: " + id, "/quotes/" + id);
    result.embed("quotes", quotes[id]);
    resp.status(HTTP.OK).send(result);
});
console.log("server listing on port 3000");
app.listen(3000);
