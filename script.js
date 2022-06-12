const express = require("express");
const app = express();
var path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// set up static folder
app.use(express.static(__dirname + "/public"));
const port = process.env.PORT || 8080;

// setup view engine for rendering
app.set("view engine", "ejs");

// landing page
app.get("/", (req, res) => {
  res.render("home");
});

// router for api routes
const userRouter = require("./api");
app.use("/api/pet", userRouter);

// wrong route
app.use((req, res, next) => {
  res.status(404).json({ error: "bad request" });
});

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
