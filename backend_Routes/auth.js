const express = require("express");
const authRouter = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  signup,
  loginUser,
  getProfile,
  logout,
} = require("../backend_Controllers/users");

//creating new user
authRouter.post("/signup", signup);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logout);
authRouter.get("/profile", verifyToken, getProfile);
module.exports = authRouter;
