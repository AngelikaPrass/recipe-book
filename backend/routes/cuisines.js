const express = require('express');
const router = express.Router({ mergeParams: true });

const Cuisines = require('../models/Cuisine');
const Recipe = require('../models/Recipe');

// get all cuisines
router.get('/', function(req,res){
    Cuisines.find({}).then(cuisines => {
        res.send(cuisines)
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    });
});

//get all recipes from a cuisine
router.get('/:id', function(req,res){
    const id = req.params.id;
    Cuisines.findById(id).then(cuisine => {
        Recipe.find({cuisineId: id}).then( recipes => {
        res.send(recipes)})
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    });
});

// add a new cuisine
router.post('/', function (req,res){
    const name = req.body.name;
    Cuisines.create({
        ...req.body,
        "_id": name.toLowerCase().replace(' ', '_')
    }).then(cuisine => {
        res.send(cuisine)
    }).catch(error => {
        console.error(error)
        res.status(500).end("internal server error");
    });
});

module.exports = router;
