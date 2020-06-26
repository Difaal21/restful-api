const express = require("express"),
  router = express.Router();
const User = require("../models/users"),
  jwt = require("jsonwebtoken");

const Auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const usernameAlreadyExist = await User.findOne({
      username: req.body.username,
    }).exec();

    if (usernameAlreadyExist) {
      return res.status(422).json({ message: "Username already exist" });
    }

    await user.save();

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (user === null || user.password !== req.body.password) {
      return res.status(401).json({ message: "Auth Failed" });
    }

    if (user.password === req.body.password) {
      const token = await jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Auth Sucessful", token: token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.userId }).exec();

    if (user.deletedCount > 0) {
      return res.status(200).json({ message: "Succesful to delete user" });
    }

    res.status(404).json({ message: "Failed to deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
