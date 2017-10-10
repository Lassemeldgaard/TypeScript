"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
var Http = require("http");
var http = new Http.Server(app);
var Socket = require("socket.io");
var io = Socket(http);
var fs = require("fs");
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
var users = [];
io.on('connection', function (socket) {
    socket.on('setUsername', function (data) {
        console.log("User: " + data + " Connected");
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
        else {
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    });
    socket.on('msg', function (data) {
        //Send message to everyone
        fs.appendFileSync("board.txt", ('<div><b>' +
            data.user + '</b>: ' + data.message + '</div>'));
        io.sockets.emit('newmsg', data);
    });
    socket.on('updatehistory', function () {
        var board = fs.readFileSync("board.txt", "utf8");
        console.log(board);
        socket.emit('history', board);
    });
});
http.listen(3000, function () {
    console.log("Listening on port 3000");
});
