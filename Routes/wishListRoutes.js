const express = require("express")
const router = express.Router();
const {addToWishList , removerFromWishList , getWishList} = require("../Controller/wishList.Controller")
const  authMiddleware  = require("../Middlewares/Auth")

router.post("/add" ,authMiddleware , addToWishList);
router.get("/" , authMiddleware ,getWishList)
router.delete("/delete/:itemId" , authMiddleware , removerFromWishList)

module.exports = router
