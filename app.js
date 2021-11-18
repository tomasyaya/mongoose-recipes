require("dotenv").config();
require("./config/mongodb.config").mongoConnect();

const express = require("express");
const hbs = require("hbs");
const path = require("path");

// routes
const recipeRoutes = require("./routes/recipes.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

require("./config/app.config").middlewareConfig(app);

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/recipes", recipeRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(7000, () => console.log("server running on port 7000"));
