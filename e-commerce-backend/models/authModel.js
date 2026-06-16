const mongoose = require('mongoose')
const express = require("express")

const router = express.Router()

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);



// router.get("/" , async (req , res) =>{
//     const users =  await User.find()
  
//     res.json(users).statusCode(200)
//   })
  
  
//   router.post("/" , async (req , res) =>{
//       const user = User.create({
//           userId: req.userId,
//           name: req.name,
//           email: req.email,
//           hashedPassword: req.hashedPassword,
//       })
  
//       res.status(201).json({message: '"user created successfully!" ' , ...user, hashedPassword: 'is secret'})
//   })
  
//   module.exports = router