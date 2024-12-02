const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");
const app = express();
const Blog = require("./models/Blog");
const { log } = require("console");

//connectDB
mongoose.connect("mongodb://localhost/blogs");

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("index", {
    blogs: blogs,
  });
});

app.get("/blogs/:id", async (req, res) => {
  // console.log(req.params.id);

  // res.render("about");
  const post = await Blog.findById(req.params.id);
  res.render("post", {
    post,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/blogs", async (req, res) => {
  await Blog.create(req.body);
  res.redirect("/");
});

app.get("/blogs/edit/:id", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.render("edit", {
    blog,
  });
});

app.put("/blogs/:id", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.detail = req.body.detail;
  blog.save();

  res.redirect(`/blogs/${req.params.id}`);
});

app.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
