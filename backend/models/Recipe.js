const {Schema, model} = require("mongoose");

const recipeSchema = new Schema({
    _id: String,
    name: String,
    tags: [String],
    ingredients: [String],
    recipe: String,
    photo: String,
    isVegan: Boolean,
    isVegetarian: Boolean,
    preparationTime: Number,
    cookingTime: Number,
    createdOn: Date
});
module.exports = model("Recipe", recipeSchema, "recipes");
