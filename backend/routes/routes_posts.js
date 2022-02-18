const express = require("express");
const Route   = express.Router();

const auth    = require("../middleware/auth")
const routeControllers_posts = require("../controllers/controllers_post");

// Routes pour les posts
Route.get("/", routeControllers_posts.getAllPost);
Route.post("/", routeControllers_posts.createPost);
Route.get("/:id", routeControllers_posts.getOnePost);
Route.delete("/:id", routeControllers_posts.deletePost);
Route.get("/user:id/posts", routeControllers_posts.getUsersPosts);
Route.put("/:id", auth, routeControllers_posts.modifyPost);

// route commentaire de post
Route.post("/:id/comment", routeControllers_posts.commentaire);
Route.get("/comments/:id", routeControllers_posts.recupAllCommentaire);
Route.get("/comment/:id", routeControllers_posts.recupOneCommentaire);
Route.delete("/comment/:id", routeControllers_posts.deleteCommentaire);
Route.get("/comments/post/:id", routeControllers_posts.recupAllCommentOnePost)

// route partage de post
Route.post("/partage/post/:id", routeControllers_posts.partage);
Route.get("/partage/post/:id", routeControllers_posts.recupPartage);


module.exports = Route;
