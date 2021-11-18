// POST schema is for a "page" that renders Recipes
// and the information of the Author which is a User
// Post should also have title, description

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  recipes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Recipe",
    },
  ],
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", PostSchema);
