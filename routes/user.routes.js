const { Router } = require("express");
const routes = Router();

const {
  createUser,
  addRecipe,
  getUser,
  getUsers,
} = require("../controllers/user.controller");

// routes in a Router instance and you can attach methods handlers
// methods allowed --> get / post / put / patch / delete
// this is the same as doing app.get("/...", () => {}) or app.post("/...", () => {})

routes
  .get("/", getUsers)
  .post("/", createUser)
  .post("/:userId/:recipeId", addRecipe)
  .get("/:userId", getUser);

// export the routes instance with all my routes and handlers
module.exports = routes;
