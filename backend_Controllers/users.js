const user = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//JST
//
const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const alreadyUser = await user.findOne({ email });

    if (alreadyUser) {
      // res.status(409).json("User already exists");
      throw new Error("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = await user.create({ email, password: hashedPassword, name });
      res.status(201).json(data);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyUser = await user.findOne({ email }).select("+password");
    if (!alreadyUser) {
      throw new Error("User does not exist");
      // res.status(404).json("User not found");
    } else {
      // const hashedPassword = alreadyUser.password;
      const match = await bcrypt.compare(password, alreadyUser.password);
      if (match) {
        // res.json(alreadyUser);
        const payload = { email: alreadyUser.email, id: alreadyUser._id };
        const token = jwt.sign(payload, process.env.JWT_SECTRET, {
          expiresIn: "80000s",
        });
        res
          .cookie("access_token", token, {
            maxAge: 1000 * 2000,
          })
          .json(payload);
      } else {
        throw new Error("wrong password");
        // res.status(401).json("Unauthorized: wrong password");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res
      .cookie("access_token", "", { maxAge: 0 })
      .end("You have been logged out successfully!");
    // res.send("You have been logged out successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProfile = async (req, res) => {
  //   console.log(req.user);
  //   res.send("profile");

  try {
    const userProfile = await user.findOne({ email: req.user.email }).exec();

    if (!userProfile) {
      res.status(404).json("User profile not found");
    } else {
      const { email, name } = userProfile;
      res.status(200).json({ email, name });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving user profile");
  }
};

module.exports = { signup, getProfile, loginUser, logout };
