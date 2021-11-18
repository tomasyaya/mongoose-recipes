const User = require("../model/user.model");
const Post = require("../model/post.model");

async function createUser(req, res) {
  try {
    const { body } = req;
    const user = await User.create(body);
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error("error", error.message);
    res.render("error", error);
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("recipes");
    console.log("user", user);
    res.render("user", user);
  } catch (error) {
    console.error("error", error.message);
    res.render("error", error);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.render("users", { users });
  } catch (error) {
    console.error("error", error.message);
    res.render("error", error);
  }
}

async function addRecipe(req, res) {
  try {
    const { userId, recipeId } = req.params;
    const user = await User.findByIdAndUpdate(userId, {
      $push: { recipes: recipeId },
    });
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error("error", error.message);
    res.render("error", error);
  }
}

// DUMMY CONTROLLER ONLY FOR DEMOSTRATION PURPOSE
// async function createPost(req, res) {
//   const { recipeId } = req.params;
//   const { title, description, userId } = req.body;
//   const newPost = await Post.create({
//     title,
//     description,
//     author: userId,
//     $push: { recipes: recipeId },
//   });

//   res.render("", { newPost });
// }

module.exports = { createUser, addRecipe, getUser, getUsers };
