const mongoose = require("mongoose")
const dbname = 'fd-projekt';
const url = `mongodb://127.0.0.1:27017/${dbname}`;

const recipeCollection = 'recipes';
const cuisineCollection = 'cuisines';
const file1 = require('./recipes.json');
const file2 = require('./cuisines.json');
const recipe = require('../models/Recipe');
const cuisine = require('../models/Cuisine');

async function addToDb(fileToAdd, model) {
  mongoose.connect(url).then(()=> {
    console.log(7)
    model.insertMany(fileToAdd).then(() => {
      console.log(`data has been added to `);
    }).catch((err) => {
      console.log(err);
    })
  })
}

addToDb(file2, cuisine);
addToDb(file1, recipe);
