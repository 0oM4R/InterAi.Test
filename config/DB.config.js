const mongoose =require('mongoose');
const connection =async ()=>{
   return  await mongoose.connect('mongodb://localhost/my_database')
   .then(
        ()=> console.log('DB connection established')
    );
};
module.exports = connection;


// Add this two lines in index.js after line 3
// const connection =require("./config/DB.config.js");
// connection();