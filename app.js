const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blogRoutes");

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

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blogs Route
app.use("/blogs", blogRoute);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
