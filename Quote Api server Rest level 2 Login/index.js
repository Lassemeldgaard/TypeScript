"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var BodyParser = require("body-parser");
var HttpStatus = require("http-status-codes");
var jwtexpress = require("express-jwt");
var jwt = require("jsonwebtoken");
var sql = require("mssql");
var app = Express();
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(jwtexpress({ secret: "HemmeligKode" }).unless({ path: ['/quotes/login'] }));
var config = {
    user: 'Skovmose',
    password: 'Dinmor123',
    server: 'restapi3sem.database.windows.net',
    database: 'UserinformationAPI',
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
};
var connection = new sql.ConnectionPool(config);
connection.connect().then(function () {
    console.log('Connection pool open for duty');
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
}).catch(function (err) {
    console.error('Error creating connection pool', err);
});
var quotes = [{
        title: "Awesome quote",
        description: "This is an awesome quote",
        rating: 0,
        date: new Date()
    },
    {
        title: "Another awesome quote",
        description: "This is also an awesome quote",
        rating: -10,
        date: new Date()
    }];
app.post('/quotes/login', function (req, resp) {
    var request = new sql.Request(connection);
    var user = "";
    var password = "";
    if (!req.body.username) {
        resp.status(400).send("Username required");
        return;
    }
    if (!req.body.password) {
        resp.status(400).send("Password required");
        return;
    }
    request.query("SELECT Username FROM Brugere WHERE Username =" + "'" + req.body.username + "'", function (err, result) {
        if (result != null) {
            var userTable = result.recordset.toTable();
            user = "" + userTable.rows[0];
            console.log("Vi har et username" + user);
            request.query("SELECT Password FROM Brugere WHERE Username =" + "'" + user + "'", function (err, PasswordResult) {
                if (PasswordResult != null) {
                    var passwordTable = PasswordResult.recordset.toTable();
                    password = "" + passwordTable.rows[0];
                    console.log("Vi har et password" + password);
                    console.log(password + " og body password = " + req.body.password);
                    if (password === req.body.password) {
                        console.log("Vi laver en token");
                        var myToken = jwt.sign({ username: req.body.username }, "HemmeligKode");
                        resp.status(200).json(myToken);
                    }
                    else {
                        console.log("Wrong password, bitch");
                        console.log("'" + password + "' og body password = '" + req.body.password + "'");
                    }
                }
                else if (err) {
                    console.log("Error ved password");
                    return;
                }
            });
        }
        else if (err) {
            console.log("Error ved username");
            return;
        }
    });
});
app.get("/quotes/list", function (req, resp) {
    var result = quotes;
    resp.status(HttpStatus.OK).json(result);
});
app.post("/quotes/sortbyrating", function (req, resp) {
    var result;
    var sorted = quotes.slice(0);
    sorted.sort(function (a, b) { return b.rating > a.rating ? 1 : -1; });
    result = sorted.slice(0, 10);
    resp.json(result);
});
app.post("/quotes/sortbydate", function (req, resp) {
    var result;
    result = quotes.sort(function (a, b) { return a.date - b.date; });
    resp.json(result);
});
app.post("/quotes/show/:id", function (req, resp) {
    var id = req.params.id;
    var result = quotes[id];
    resp.json(result);
});
app.delete("/quotes/:id/delete", function (req, resp) {
    var id = req.params.id;
    quotes.splice(id, 1);
    var result = "Deleted, remain calm!";
    resp.json(quotes);
});
app.post("/quotes/:id/upvote", function (req, resp) {
    var id = req.params.id;
    var rating = quotes[id].rating++;
    var result = "Upvoted, you deserve a medal!";
    resp.json(result);
});
app.post("/quotes/:id/downvote", function (req, resp) {
    var id = req.params.id;
    var rating = quotes[id].rating--;
    var result = "Downvoted, you deserve a chair to the face!";
    resp.json(result);
});
app.post("/quotes/add", function (req, resp) {
    var title = req.body.title;
    var description = req.body.description;
    var date = new Date();
    var rating = 0;
    quotes.push({ title: title, description: description, rating: rating, date: date });
    var result = "Added, be calm!";
    resp.status(HttpStatus.CREATED).json(result);
});
app.put("/quotes/:id/update", function (req, resp) {
    var id = req.params.id;
    quotes[id].title = req.body.title;
    quotes[id].description = req.body.description;
    resp.status(HttpStatus.NO_CONTENT).json(quotes);
});
app.options("*", function (req, resp) {
    resp.status(HttpStatus.OK).json("*");
});
