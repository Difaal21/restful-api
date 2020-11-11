const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Conmect MongoDB
const connectDB = require("./api/config/connect");
connectDB();

app.use("/user", require("./api/routes/users"));
app.use("/products", require("./api/routes/products"));

app.use((req, res, next) => {
  const error = new Error(" Page Not Found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    messsage: error.message,
  });
});

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));
