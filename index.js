const express = require("express");
require("dotenv").config();
require("./db");
const app = express();
const userRouter = require("./backend_Routes/users");
const port = 3002;

app.use(express.json());
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
