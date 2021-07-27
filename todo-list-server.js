const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

//Start listening to the server
app.listen(3000);

//Connect to the database
const connectDB = mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log("Succesfully connected to the DB")
);
