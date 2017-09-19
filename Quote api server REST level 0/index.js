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
        rating: 0
    },
    {
        title: "Awesome quote2",
        description: 'This is an awesome quote 2 made by lasse',
        rating: 1
    }];
app.post("/api", function (req, resp) {
    var result;
    var func = req.body.function;
    if (func === "add") {
        var title = req.body.title;
        var description = req.body.description;
        var rating = req.body.rating;
        quotes.push({ title: title, description: description, rating: rating });
        result = "added";
    }
    else if (func === "list") {
        result = quotes;
    }
    else if (func === "show") {
        var id = req.body.id;
        result = quotes[id];
    }
    else if (func === "delete") {
        var id = req.body.id;
        quotes.splice(id, 1);
        result = "Deleted";
    }
    else if (func === "upvote") {
        var id = req.body.id;
        quotes[id].rating++;
        result = "Upvoted";
    }
    else if (func === "downvote") {
        var id = req.body.id;
        quotes[id].rating--;
        result = "Downvoted";
    }
    resp.json(result);
});
console.log("server listing on port 3000");
app.listen(3000);
