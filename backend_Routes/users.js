const express = require("express");

const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  res.send("it is working agian");
});

module.exports = userRouter;
