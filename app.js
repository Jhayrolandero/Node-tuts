const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Express App
const app = express();

// Connect to MongoDB
const dbURI =
  "mongodb+srv://fellas:thegtplayer277353@nodetuts.uzjnqdt.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));
// View engine

app.set("view engine", "ejs");

// Middleware & Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Get Route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { title: "HomePage", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
