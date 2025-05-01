const connect = require("./DB/connect");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
require("dotenv").config();
const itemRoutes = require("./Routes/ItemRoutes")
const userRoutes = require("./Routes/UserRoutes");
app.use(userRoutes);
app.use(itemRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ status: "error", message: "this resource not available" });
});
connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
