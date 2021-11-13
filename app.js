const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const Recipe = require("./model/recipes.model");
const app = express();

// POST methods data comes in the req.body
// Rute params (/:userId --> /123) comes in the req.params --> req.params.userId === 123
// Query params (/search?name=tomas) comes in the req.query -> req.query.name === "tomas"

const MONGODB_URL = "mongodb://localhost/mongooseRecipes";
// mongoose is a layer before mongo to better interact with the DB
// instead of working directly with mongo, you work with mongoose and mongoose with mono
mongoose
  .connect(MONGODB_URL)
  .then(({ connection }) => {
    console.log(`Mongo DB conected at: ${connection.name}`);
  })
  .catch((e) => console.error(`Mongo Error: ${e}`));

// tell express he need to handle post requests
// post data comes in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tell express where to find the static files
app.use(express.static(path.join(__dirname, "public")));
// tell express what engine to use for the views
app.set("view engine", "hbs");
// tell express where to find the views files
app.set("views", path.join(__dirname, "views"));
// tell hbs where to find the partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// setting a controller for a GET request at http://localhost:6000/
// a controller is the handler for the request
app.get("/", async (req, res) => {
  const query = req.query;
  // query -> { name: "pizza" }
  // Recipe.find({ name: "pizza" })
  const recipes = await Recipe.find(query);
  res.render("home", { recipes });
});

app.get("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await Recipe.findById(recipeId);
  // recipe -> {name: "pizza", description: "pizza"}
  // { recipe } -> { recipe: { name: "pizza", description: "pizza" } }
  res.render("recipe", recipe);
});

app.post("/recipes", async (req, res) => {
  const recipeData = req.body;
  const newRecipe = await Recipe.create(recipeData);
  console.log("newRecipe", newRecipe);
  res.redirect("/");
});

app.listen(7000, () => console.log("server running on port 7000"));

// when user types http://localhost:6000/ --> browser send a get request to the url
// server is listening to the request and responds with the render.hbs
// user is going to find a list of recipes and a form to create a recipe
// when user submits the form for the new recipe the browser sends a POST request to: http://localhost:6000/recipes
// the server handles with the app.post("/recipes", ....)
// the app.post, onces creates the recipes, tell the browser to redirect to http://localhost:6000/
// the browser send a GET request to http://localhost:6000/
// my server gets the request, search all the recipes again and sends the new home.hbs with the new recipe there
// the browser paints the home.hbs with the new recipe
