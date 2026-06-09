const mongoose = require('mongoose');
const {config} = require('dotenv')
config()

const connectDB = async ()=>{
   try{
     const uri = process.env.MONGO_URI

     console.log("Connecting to MongoDB...");
     console.log("URI exists:", !!uri);
   
    await mongoose.connect(uri)
    console.log("MongoDB Connected")
   }
   catch(error){
        console.error("Database connection failed:", error);
   }

};

module.exports = connectDB;
