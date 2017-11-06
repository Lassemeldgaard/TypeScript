import * as Express from 'express';
let app = Express();
import * as Http from 'http';
let http = new Http.Server(app);
import * as Socket from 'socket.io';
let io = Socket(http);
import * as fs from 'fs';

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

let users: any = [];
io.on('connection', function (socket) {
    
    socket.on('setUsername', function (data) {
        console.log("User: " + data + " Connected");
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
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
    socket.on('updatehistory', function(){
        let board = fs.readFileSync("board.txt", "utf8");
        console.log(board);
        socket.emit('history', board);              
    })
    socket.on('whisper', function(data){
        
    })
});


http.listen(3000, () => {
    console.log("Listening on port 3000");

});