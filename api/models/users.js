const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
