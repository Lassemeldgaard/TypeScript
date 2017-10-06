
import * as Express from "express";
import * as BodyParser from "body-parser";
import * as HttpStatus from "http-status-codes";
import jwtexpress = require('express-jwt');
import jwt = require('jsonwebtoken')
import * as sql from 'mssql';

let app = Express();

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(jwtexpress({ secret: "HemmeligKode" }).unless({ path: ['/quotes/login'] }));

let config = {
    user: 'Skovmose',
    password: 'Dinmor123',
    server: 'restapi3sem.database.windows.net',
    database: 'UserinformationAPI',
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

let connection = new sql.ConnectionPool(config);

connection.connect().then(function () {
    console.log('Connection pool open for duty');

    let server = app.listen(3000, function () {

        let host = server.address().address;
        let port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);

    });
}).catch(function (err: any) {
    console.error('Error creating connection pool', err);
});

let quotes: any[] = [{
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
    let request = new sql.Request(connection);
    let user = "";
    let password = "";
    if (!req.body.username) {
        resp.status(400).send("Username required")
        return;
    }
    if (!req.body.password) {
        resp.status(400).send("Password required")
        return;
    }
    request.query("SELECT Username FROM Brugere WHERE Username =" + "'" + req.body.username + "'", function (err, result) {
        if (result != null) {
            let userTable = result.recordset.toTable();
            user = "" + userTable.rows[0];
            console.log("Vi har et username" + user);
            request.query("SELECT Password FROM Brugere WHERE Username =" + "'" + user + "'", function (err, PasswordResult) {
                if (PasswordResult != null) {
                    let passwordTable = PasswordResult.recordset.toTable();
                    password = "" + passwordTable.rows[0];
                    console.log("Vi har et password" + password);
                    console.log(password + " og body password = " + req.body.password);

                    if (password === req.body.password) {

                        console.log("Vi laver en token");
                        let myToken = jwt.sign({ username: req.body.username }, "HemmeligKode")
                        resp.status(200).json(myToken)
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
app.get("/quotes/list", (req, resp) => {
    let result = quotes;
    resp.status(HttpStatus.OK).json(result);

});
app.post("/quotes/sortbyrating", (req, resp) => {
    let result;
    let sorted = quotes.slice(0);
    sorted.sort((a, b) => b.rating > a.rating ? 1 : -1);
    result = sorted.slice(0, 10);
    resp.json(result);
});
app.post("/quotes/sortbydate", (req, resp) => {
    let result;
    result = quotes.sort((a, b) => a.date - b.date);
    resp.json(result);
});
app.post("/quotes/show/:id", (req, resp) => {
    let id = req.params.id;
    let result = quotes[id];
    resp.json(result);
});
app.delete("/quotes/:id/delete", (req, resp) => {
    let id = req.params.id;
    quotes.splice(id, 1);
    let result = "Deleted, remain calm!";
    resp.json(quotes);
});
app.post("/quotes/:id/upvote", (req, resp) => {
    let id = req.params.id;
    let rating = quotes[id].rating++;
    let result = "Upvoted, you deserve a medal!";
    resp.json(result);
});
app.post("/quotes/:id/downvote", (req, resp) => {
    let id = req.params.id;
    let rating = quotes[id].rating--;
    let result = "Downvoted, you deserve a chair to the face!";
    resp.json(result);
});
app.post("/quotes/add", (req, resp) => {
    let title = req.body.title;
    let description = req.body.description;
    let date = new Date();
    let rating = 0;
    quotes.push({ title, description, rating, date });
    let result = "Added, be calm!";
    resp.status(HttpStatus.CREATED).json(result);
});
app.put("/quotes/:id/update", (req, resp) => {
    let id = req.params.id;
    quotes[id].title = req.body.title;
    quotes[id].description = req.body.description;
    resp.status(HttpStatus.NO_CONTENT).json(quotes);
});
app.options("*", (req, resp) => {
    resp.status(HttpStatus.OK).json("*");
});



