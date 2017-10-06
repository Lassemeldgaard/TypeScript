import * as Express from 'express';
let app = Express();

import * as BodyParser from 'body-parser'
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }))

import * as HTTP from 'http-status-codes';

import {Resource} from 'hal'

app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS")
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-with,Content-type, Accept");
    
    next();
});

let quotes: any[] = [{
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
app.put("/quotes/:id/downvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";
    resp.status(HTTP.OK).send(result);
});
app.put("/quotes/:id/upvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";
    resp.status(HTTP.OK).send(result);
});
app.delete("/quotes/:id/", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";

    resp.status(HTTP.NO_CONTENT).send(result);
});
app.post("/quotes", (req, resp) => {
    let title = req.body.title;
    let description = req.body.description;
    let rating = 0;
    let date = new Date();
    quotes.push({ title, description, rating, date });
    let result = "added";
    resp.status(HTTP.CREATED).send(result);
});
app.get("/quotes/list", (req, resp) => {
    let result = new Resource({}, "/quotes/list")
    
    for (let i = 0; i < quotes.length; i++) {
        let title = quotes[i].title
        let quote = new Resource({title}, "/quotes/" + i);
        result.link(quotes[i].title, "/quotes/" + i)
        
        result.embed("quotes", quote)
    }
    resp.status(HTTP.OK).json(result);
});



app.get("/quotes/highestrated", (req, resp) => {
    let result = new Resource({}, "/quotes/highestrated")
    quotes.sort((a, b) => b.rating > a.rating ? 1 : -1)
    for (let i = 0; i < quotes.length; i++) {
        let title = quotes[i].title
        let description = quotes[i].description
        let rating = quotes[i].rating
        let date = quotes[i].date

        let quote = new Resource({title, description, rating, date}, "/quotes/" + i);
        
        result.link(quotes[i].title, "/quotes/" + i)        
        result.embed("quotes", quote)
    }
    resp.status(HTTP.OK).send(result)
});
app.get("/quotes/newest", (req, resp) => {
    let result = new Resource({}, "/quotes/newest")
    quotes.sort((a, b) => b.date - a.date)
    for (let i = 0; i < quotes.length; i++) {
        let title = quotes[i].title
        let description = quotes[i].description
        let rating = quotes[i].rating
        let date = quotes[i].date

        let quote = new Resource({title, description, rating, date}, "/quotes/" + i);
        
        result.link(quotes[i].title, "/quotes/" + i)        
        result.embed("quotes", quote)
    }
    resp.status(HTTP.OK).send(result)
});
app.get("/quotes/:id", (req, resp) => {
    
    let id = req.params.id;
    let result = new Resource(quotes[req.params], "/quotes/" + id) ;
    result.link("Quote: " + id,"/quotes/" + id )
    result.embed("quotes", quotes[id])
    resp.status(HTTP.OK).send(result)
});




console.log("server listing on port 3000");
app.listen(3000);
