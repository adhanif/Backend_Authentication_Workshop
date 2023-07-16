const express = require("express");
require("dotenv").config();
require("./db");
const app = express();
const authRouter = require("./backend_Routes/auth");
const port = 3002;

app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
