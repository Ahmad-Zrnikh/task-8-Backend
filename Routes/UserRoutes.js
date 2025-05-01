const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/User");
const auth = require("../Middlewares/Auth");
const multer = require("multer");
const {register , login} = require("../Controller/user.Controller");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `item-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: diskStorage,
  fileFilter: function (req, file, cb) {
    const type = file.mimetype.split("/")[0];
    if (type === "image") {
      return cb(null, true);
    } else {
      return cb(new Error("Only image are allowed."), false);
    }
  },
});

router.get("/users",  async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json({ status: "success", data: { users } });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
router.post("/users/register", upload.single("profile_image"), register);
router.post("/users/login", login);

module.exports = router;
