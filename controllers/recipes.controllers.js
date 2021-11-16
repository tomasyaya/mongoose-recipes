const Recipe = require("../model/recipes.model");

async function getRecipes(req, res) {
  const query = req.query;
  const recipes = await Recipe.find(query);
  res.render("recipes", { recipes });
}

async function getRecipeById(req, res) {
  const { recipeId } = req.params;
  const recipe = await Recipe.findById(recipeId);
  res.render("recipe", recipe);
}

async function createRecipe(req, res) {
  const recipeData = req.body;
  await Recipe.create(recipeData);
  res.redirect("/recipes");
}

async function deleteRecipe(req, res) {
  const { recipeId } = req.params;
  await Recipe.findByIdAndDelete(recipeId);
  res.redirect("/recipes");
}

async function updateRecipe(req, res) {
  const { recipeId } = req.params;
  const { body } = req;
  await Recipe.findByIdAndUpdate(recipeId, body);
  res.redirect(`/recipes/${recipeId}`);
}

module.exports = {
  getRecipeById,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  createRecipe,
};
