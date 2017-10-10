"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
var Http = require("http");
var http = new Http.Server(app);
var Socket = require("socket.io");
var io = Socket(http);
app.get('/', function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
/*io.on('connection', conn =>{
    
    conn.on('message', mess =>{
        console.log(mess.a);
        io.emit('Whatever', 'whas uuuup')
    });

    conn.on('disconnect', () =>{
        console.log("Someone disconnected");
    });
});
*/
io.on('connection', function (socket) {
    console.log("someone connected");
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        socket.emit('chat message', msg);
    });
});
http.listen(3000, function () {
    console.log("listening on port 3000");
});
