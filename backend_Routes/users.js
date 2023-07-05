const express = require("express");
const userRouter = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createUser,
  loginUser,
  getProfile,
} = require("../backend_Controllers/users");

//creating new user
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", verifyToken, getProfile);
module.exports = userRouter;
