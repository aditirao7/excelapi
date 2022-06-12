const express = require("express");
const app = express();
var path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

const userRouter = require("./api");
app.use("/api/pet", userRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "bad request" });
});

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
