const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({message : "you are not authenticated"});
    }
const token = authHeader.split(' ')[1];

try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
}catch(err){
    return res.status(500).json({message: err.message})
}
}
module.exports = authMiddleware;