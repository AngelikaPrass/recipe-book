const { Schema, model } = require('mongoose');

const cuisineSchema = new Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    }
});

module.exports = model("Cuisine", cuisineSchema, "cuisines");

