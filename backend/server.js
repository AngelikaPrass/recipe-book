const express = require('express');
const connectingToMongo = require("./connectingToMongo.js");
const Recipe = require("./models/Recipe.js");
const { uuid } = require('uuidv4');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// all recipes
app.get('/recipes', function (req, res) {
    Recipe.find({}).then(recipes => {
        res.send(recipes)
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    })
});

// one recipe by id
app.get('/recipes/:id', function (req, res){
    const id = req.params.id;
    Recipe.findById(id).then(recipe => {
        res.send(recipe)
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    });
});

// adding recipe
app.post('/recipes', function (req, res){
        Recipe.create({
            "_id": uuid(),
            "name": req.body.name,
            "tags": req.body.tags,
            "ingredients": req.body.ingredients,
            "recipe": req.body.recipe,
            "photo": req.body.photo,
            "isVegan": req.body.isVegan,
            "isVegetarian": req.body.isVegetarian
        }).then(recipe => {
            res.send(recipe);
        }).catch(error => {
            console.error(error)
            res.status(500).end("internal server error");
        });
});

//modifying a recipe
app.put('/recipes/:id', function(req, res){
    const id = req.params.id;
        Recipe.findByIdAndUpdate(id, req.body).then(recipe => {
            res.send(recipe)
        }).catch(error => {
            console.error(error);
            res.status(500).end("internal server error");
        });

});

// deleting a recipe
app.delete('/recipes/:id', function (req,res){
    const id = req.params.id;
    Recipe.findByIdAndDelete(id).then(recipe => {
        res.send(recipe)
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    });
});



connectingToMongo.then((mongoose) => {
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error(error)
});

