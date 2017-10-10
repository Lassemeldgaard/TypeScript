import * as Express from 'express'
let app = Express();
import * as Http from 'http'
let http = new Http.Server(app);
import * as Socket from 'socket.io'
let io = Socket(http);

app.get('/', (req, resp) =>{
    resp.sendFile(__dirname + "/index.html")
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
io.on('connection', function(socket){
    console.log("someone connected");
    socket.on('chat message', function(msg){
    console.log('message: ' + msg);
      socket.emit('chat message', msg)
    });
  });

http.listen(3000, () =>{
    console.log("listening on port 3000");    
});