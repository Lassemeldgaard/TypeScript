import * as Express from 'express';
let app = Express();

import * as BodyParser from 'body-parser'
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}))

let quotes = [{
    title: "Awesome quote",
    description: 'This is an awesome quote made by lasse',
    rating: 0
},
{
    title: "Awesome quote2",
    description: 'This is an awesome quote 2 made by lasse',
    rating: 1
}];

app.post("/api", (req, resp) => {
    let result;
    let func = req.body.function;
    

    if(func === "add"){
        let title = req.body.title;
        let description = req.body.description;
        let rating = req.body.rating
        quotes.push({title, description, rating});
        result = "added";
    }
    else if(func === "list"){
        result = quotes;
    }
    else if(func === "show"){
        let id = req.body.id;
        result = quotes[id];
    }
    else if (func === "delete"){
        let id = req.body.id;
        quotes.splice(id, 1);
        result = "Deleted";
    }
    else if(func === "upvote"){
        let id = req.body.id;
        quotes[id].rating++;
        result ="Upvoted";
    }
    else if(func === "downvote"){
        let id = req.body.id;
        quotes[id].rating--;
        result ="Downvoted";
    }
    resp.json(result);
});

console.log("server listing on port 3000");
app.listen(3000);
