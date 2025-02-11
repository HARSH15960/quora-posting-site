const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve Static Files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Dummy Post Data
let posts = [
  { id: uuidv4(), username: "apnaCollege", content: "I love coding" },
  { id: uuidv4(), username: "HarshSingla", content: "Hard Work is important to achieve success" },
  { id: uuidv4(), username: "RahulKumar", content: "I got selected for my 1st internship" },
];

// Show All Posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Show Create Post Form
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create New Post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// Show Single Post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
});

// Show Edit Post Form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

// Update Post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  if (post) post.content = newContent;
  res.redirect("/posts");
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
