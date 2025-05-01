const Item = require("../Models/Item");

const hasAccess = async(req, res, next) => {
    try{
        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({message: "item not found "})
        }
        if(item.user_id.toString() == req.user._id){
            next()
        }else {
    
            res.status(403).json({ message: "You can not edit or delete this item" });
    }
}catch(err){
    return res.status(500).json({message : err.message})
}


}
module.exports = hasAccess