"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var app = Express();
app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
console.log("server listing on port 3000");
app.listen(3000);
