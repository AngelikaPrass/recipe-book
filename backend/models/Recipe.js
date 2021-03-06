const { Schema, model } = require('mongoose');
const {v4: uuidv4} = require("uuid")

const recipeSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  isVegan: {
    type: Boolean,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    required: true,
  },
  preparationTime: {
    type: Number,
  },
  cookingTime: {
    type: Number,
  },
  createdOn: {
    type: Date,
    required: true,
  },
  cuisineId: {
    type: String
  }
});
module.exports = model("Recipe", recipeSchema, "recipes");

