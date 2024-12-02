const express = require("express");
const mongoose = require("mongoose");

const ejs = require("ejs");
const path = require("path");
const app = express();
const Blog = require("./models/Blog");

//connectDB
mongoose.connect("mongodb://localhost/blogs");

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ROUTES
app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("index", {
    blogs: blogs,
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
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
