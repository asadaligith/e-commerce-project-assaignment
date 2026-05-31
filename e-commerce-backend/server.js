const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("./cloudinary");
const express = require('express');
const cors = require('cors')
const {config} = require('dotenv')
const productData = require('./product.json');

config();
const port = process.env.PORT || 4000;

const app = express()
app.use(cors())
app.use(express.json());


let products = productData.products;

app.get('/', (req, res)=>{
    res.send("API Running.....")

})

app.get('/products', (req,res)=>{
    res.json({
           products
    })

})

////////////////// Signup API //////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage,
});

app.post("/auth/signup", upload.single("image"), async (req, res) => {
    const { name, email, password } = req.body;
  
    const users = JSON.parse(
      fs.readFileSync("./users.json", "utf-8")
    );
  
    const existingUser = users.find(
      (u) => u.email === email
    );
  
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "olx-users",
      }
    );
  
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
  
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      image: result.secure_url,
    };
  
    users.push(newUser);
  
    fs.writeFileSync(
      "./users.json",
      JSON.stringify(users, null, 2)
    );
  
    res.status(201).json({
      success: true,
    });
  });



  //////////////////// Login API ///////////////////////////


  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
  
    const users = JSON.parse(
      fs.readFileSync("./users.json", "utf-8")
    );
  
    const user = users.find(
      (u) => u.email === email
    );
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
  
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
  
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
  
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  });






app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})