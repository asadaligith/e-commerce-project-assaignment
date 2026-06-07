const mongoose = require('mongoose');

const connectDB = async ()=>{
    const uri = process.env.MONGO_URI

    if(!uri){
        throw new Error("MONGODB_URI is not defined in environment variables")
    }
   
    await mongoose.connect(uri)
    console.log("MongoDB Connected")
    
};

module.exports = connectDB;
