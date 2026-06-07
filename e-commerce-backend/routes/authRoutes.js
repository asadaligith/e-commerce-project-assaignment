const express = require("express");
const router = express.Router();

const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

//////////////// Signup //////////////////

router.post(
  "/signup",
  upload.single("image"),
  async (req, res) => {
    try {
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

      users.push(newUser);

      fs.writeFileSync(
        "./users.json",
        JSON.stringify(users, null, 2)
      );

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

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;