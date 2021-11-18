const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
  },
  recipes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("User", UserSchema);
