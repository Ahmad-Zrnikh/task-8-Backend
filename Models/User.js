const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required : true,
        
        
    },
    last_name:{
        type: String,
        required : true
    },
    password_confirmation:{
        type: String,
        required : true,

    },
    password: {
        type: String,
        required : true,

    },
    user_name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        validate : [validator.isEmail , 'invalid Email']
    },
    profile_image:{
        type: String,
        required : true
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
},{timestamps: true});

const User = mongoose.model("User" , userSchema);
module.exports = User;