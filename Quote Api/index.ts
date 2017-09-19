import * as Express from 'express';
let app = Express();

import * as BodyParser from 'body-parser'
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }))

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

app.post("/quotes/:id/downvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating--;
    result = "Downvoted";

    resp.json(result);
});
app.post("/quotes/:id/upvote", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes[id].rating++;
    result = "Upvoted";

    resp.json(result);
});
app.post("/quotes/:id/delete", (req, resp) => {
    let result;
    let id = req.params.id;
    quotes.splice(id, 1);
    result = "Deleted";

    resp.json(result);
});
app.post("/quotes/add", (req, resp) => {
    let title = req.body.title;
    let description = req.body.description;
    let rating = 0;
    let date = new Date();
    quotes.push({ title, description, rating, date });
    let result = "added";
    resp.json(result);
});
app.post("/quotes/show/:id", (req, resp) => {
    let result;
    let id = req.params.id;
    result = quotes[id];

    resp.json(result);
});
app.post("/quotes", (req, resp) => {
    let result;
    result = quotes;
    resp.json(result);
});
app.post("/quotes/highestrated", (req, resp) => {
    let result;
    quotes.sort((a,b) => b.rating > a.rating ? 1 : -1)
    result = quotes;
    resp.json(result);
});
app.post("/quotes/newest", (req, resp) => {
    let result;
    quotes.sort((a,b) => a.date - b.date)
    result = quotes;
    resp.json(result);
});



console.log("server listing on port 3000");
app.listen(3000);
