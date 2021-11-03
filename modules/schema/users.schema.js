const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    userName : { String, required},
    email : { String, required},
    password : { String, required}

})

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;