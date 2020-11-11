const express = require("express"),
  router = express.Router();
const User = require("../models/users"),
  jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const Auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    company: req.body.company,
    gmail: req.body.gmail,
  });

  try {
    const passwordLength = user.password.length;

    if (passwordLength < 8) {
      return res.status(400).json({
        message: "Password should be at least 8 character",
      });
    }

    const userAlreadyExist = await User.findOne({
      $or: [{ username: req.body.username }, { gmail: req.body.gmail }],
    }).exec();

    if (userAlreadyExist) {
      if (userAlreadyExist.username == user.username) {
        return res.status(422).json({
          code: 422,
          message: "Username already exist",
        });
      }

      if (userAlreadyExist.gmail == user.gmail) {
        return res.status(422).json({
          code: 422,
          message: "Email already exist",
        });
      }
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          if (err) throw err;
          user.password = hash;
          try {
            await user.save();
            res.status(201).json({
              code: 201,
              message: "User created",
            });
          } catch (error) {
            console.error(error);
          }
        });
      });
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    bcrypt.compare(req.body.password, user.password, async (err, result) => {
      if (err) {
        return res.status(401).json({ code: 401, message: "Auth Failed" });
      }
      if (result) {
        const token = await jwt.sign(
          { id: user.id, username: user.username, name: user.name },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res
          .status(200)
          .json({ code: 200, message: "Auth Sucessful", token: token });
      }

      return res.status(401).json({ code: 401, message: "Auth Failed" });
    });
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
