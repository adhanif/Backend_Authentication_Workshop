const mongoose = require("mongoose");
const user = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const alreadyUser = await user.findOne({ email }).exec();
    if (alreadyUser) {
      res.status(409).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = await user.create({ email, password: hashedPassword, name });
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Product");
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyUser = await user.findOne({ email }).exec();
    if (!alreadyUser) {
      res.status(404).json("User not found");
    } else {
      const hashedPassword = alreadyUser.password;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        res.status(200).json("You are authorized");
      } else {
        res.status(401).json("Unauthorized: wrong password");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error authenticating user");
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await user.find({});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Product");
  }
};

module.exports = { createUser, getUsers, authenticateUser };
