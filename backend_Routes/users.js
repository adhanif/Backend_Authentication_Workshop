const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUsers,
  authenticateUser,
} = require("../backend_Controllers/users");

//creating new user
userRouter.post("/signup", createUser);
userRouter.post("/login", authenticateUser);

userRouter.get("/users", getUsers);
module.exports = userRouter;
