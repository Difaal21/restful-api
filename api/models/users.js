const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  gender: {
    type: "String",
    required: true,
  },
  company: {
    type: "String",
  },
  gmail: {
    type: "String",
    unique: true,
    required: true,
    match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
