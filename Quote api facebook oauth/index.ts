import * as Express from 'express'
let app = Express();

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
});

console.log("server listing on port 3000");
app.listen(3000);