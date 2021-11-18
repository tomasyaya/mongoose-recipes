const path = require("path");
const express = require("express");

function middlewareConfig(app) {
  // tell express he need to handle post requests
  // post data comes in the req.body

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // tell express where to find the static files
  app.use(express.static(path.join(__dirname, "..", "public")));
  // tell express what engine to use for the views
  app.set("view engine", "hbs");
  // tell express where to find the views files
  app.set("views", path.join(__dirname, "..", "views"));
}

module.exports = { middlewareConfig };
