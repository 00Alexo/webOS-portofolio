const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    volume:{
        type: Number,
        required: true,
    },
    brightness:{
        type: Number,
        required: true,
    },
    bgImage:{
        type: Buffer,
        required: false,
    },
    starterImage:{
        type: Buffer,
        required: false,
    }
}, {timestamps: true});
  
const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection; 