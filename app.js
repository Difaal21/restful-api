const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Berhasil");
});

app.get("api/courses", (req, res) => {});

app.get("api/courses/:id", (req, res) => {
  const course = course.find((data) => data.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The coure with given ID was not dound");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {};
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port);
