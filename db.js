const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

mongoose.connection.on("error", (err) => {
  console.log("Lost connection to the database", err);
});
