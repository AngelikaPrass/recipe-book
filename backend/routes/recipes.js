const express = require('express');
const router = express.Router({ mergeParams: true });

const Recipe = require('../models/Recipe');

router.get('/', function (req, res) {
  Recipe.find({}).then(recipes => {
    res.send(recipes)
  }).catch(error => {
    console.error(error)
    res.status(500).end("internal server error");
  })
});

// one recipe by id
router.get('/:id', function (req, res){
  const id = req.params.id;
  Recipe.findById(id).then(recipe => {
    res.send(recipe)
  }).catch(error => {
    console.error(error)
    res.status(500).end("internal server error");
  });
});

// adding recipe
router.post('/', function (req, res){
  delete req.body._id;
  Recipe.create({
    ...req.body,  "createdOn": new Date()
  }).then(recipe => {
    res.send(recipe);
  }).catch(error => {
    console.error(error)
    res.status(500).end("internal server error");
  });
});

//modifying a recipe
router.put('/:id', function(req, res){
  const id = req.params.id;
  console.log(id)
  Recipe.findByIdAndUpdate(id, req.body, {new : true}).then(recipe => {
    res.send(recipe)
    console.log(recipe);
  }).catch(error => {
    console.error(error);
    res.status(500).end("internal server error");
  });

});

// deleting a recipe
router.delete('/:id', function (req,res){
  const id = req.params.id;
  Recipe.findByIdAndDelete(id).then(recipe => {
    res.send(recipe)
  }).catch(error => {
    console.error(error)
    res.status(500).end("internal server error");
  });
});


module.exports = router;
