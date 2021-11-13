const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 150,
  },
});

// mongoose will turn "Recipe" into the collection "recipes"
const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
