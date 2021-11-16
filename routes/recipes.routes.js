const { Router } = require("express");
const routes = Router();

const {
  getRecipeById,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  createRecipe,
} = require("../controllers/recipes.controllers");

// routes in a Router instance and you can attach methods handlers
// methods allowed --> get / post / put / patch / delete
// this is the same as doing app.get("/...", () => {}) or app.post("/...", () => {})

routes
  .get("/", getRecipes)
  .get("/:recipeId", getRecipeById)
  .post("/", createRecipe)
  .post("/:recipeId/delete", deleteRecipe)
  .post("/:recipeId/edit", updateRecipe);

// export the routes instance with all my routes and handlers
module.exports = routes;
