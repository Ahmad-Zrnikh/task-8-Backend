// after clouding images
// itemsRoutes.js
const express = require("express");
const multer = require("multer");
const auth = require("../Middlewares/Auth");
const hasAccess = require("../Middlewares/hasAccess");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
} = require("../Controller/items.Controller");

const router = express.Router();

router.get("/items", auth, getItems);
router.get("/items/:id", auth, getItem);
router.post("/items", upload.single("image"), auth, addItem);
router.put("/items/:id", upload.single("image"), auth, hasAccess, updateItem);
router.delete("/items/:id", auth, hasAccess, deleteItem);

module.exports = router;


// before clouding images
// const express = require("express");
// const multer = require("multer");
// const auth = require("../Middlewares/Auth");
// const hasAccess = require("../Middlewares/hasAccess")
// const {
//   getItems,
//   getItem,
//   addItem,
//   updateItem,
//   deleteItem
// } = require("../Controller/items.Controller");
// const router = express.Router();

// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const fileName = `user-${Date.now()}.${ext}`;
//     cb(null, fileName);
//   },
// });
// const upload = multer({
//   storage: diskStorage,
//   fileFilter: function (req, file, cb) {
//     const type = file.mimetype.split("/")[0];
//     if (type === "image") {
//       return cb(null, true);
//     } else {
//       return cb(new Error("Only image are allowed."), false);
//     }
//   },
// });

// router.get("/items",auth, getItems);
// router.get("/items/:id",auth, getItem);
// router.post("/items",upload.single("image"),auth, addItem);
// router.put("/items/:id",upload.single("image"),auth,hasAccess, updateItem);
// router.delete("/items/:id",auth,hasAccess, deleteItem);
// module.exports = router;
