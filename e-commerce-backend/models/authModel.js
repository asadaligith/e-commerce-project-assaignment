const mongoose = require('mongoose')
const express = require("express")

const router = express.Router()

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
    }

},
    {
        timestamps: true,
    }
)

const User = mongoose.model("user", userSchema)

router.get("/" , async (req , res) =>{
    const users =  await User.find()
  
    res.json(users).statusCode(200)
  })
  
  
  router.post("/" , async (req , res) =>{
      const user = User.create({
          userId: req.userId,
          name: req.name,
          email: req.email,
          hashedPassword: req.hashedPassword,
      })
  
      res.status(201).json({message: '"user created successfully!" ' , ...user, hashedPassword: 'is secret'})
  })
  
  module.exports = router