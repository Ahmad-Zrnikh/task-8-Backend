const UserModel = require("../Models/User");

const addToWishList = async (req, res, next) => {
  try {
    if (!req.body.itemId) {
      return res.status(400).json({ message: "Please enter id of item" });
    }
    const userId = req.user._id;

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { wishList: req.body.itemId },
      },
      { new: true }
    );
    if (!user) return res.status(400).json({ message: "user not found" });
    return res
      .status(200)
      .json({ message: "added succesfully", wishList: user.wishList });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// remove from wish list func
const removerFromWishList = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { wishList: req.params.itemId } },
      { new: true }
    );
    return res.status(200).json({message : "item deleted successfully"})
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// get wishList for specific user
const getWishList = async (req ,res ,next) =>{
    try{
const user = await UserModel.findById(req.user._id).populate("wishList");
return res.status(200).json({
   wishList : user.wishList
})
    }catch(err){
      return res.status(500).json({ message: err.message });
 
    }
}

module.exports = { addToWishList, removerFromWishList ,getWishList};
