const express = require("express");
const router = express.Router();

const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

//////////////// Signup //////////////////

router.post("/signup",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      let imageUrl = "";

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "olx-users",
          }
        );
      
        imageUrl = result.secure_url;
      }
      
      const hashedPassword = await bcrypt.hash(
        password,
        10
      );
      
      const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        image: imageUrl,
      };

      const user = await User.create(newUser);

      res.status(201).json({
        success: true,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

//////////////// Login //////////////////

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
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
        id: user._id,
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
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;