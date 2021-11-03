const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    userName : { type:String , required: true},
    email : {type:String , required: true},
    password : {type:String , required: true},
    date:{type:Date,Default: Date.now}

})

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;