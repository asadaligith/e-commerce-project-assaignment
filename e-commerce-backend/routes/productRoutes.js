const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  createProduct,
} = require("../controllers/productController");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/product");
const {authMiddleware} = require("../middleware/authMiddleware");

// All products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Search products
router.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").trim();

    if (!query) {
      const products = await Product.find().sort({
        createdAt: -1,
      });

      return res.json({
        products,
        total: products.length,
      });
    }

    const products = await Product.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json({
      products,
      total: products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.post(
  "/sell",
  authMiddleware,
  upload.single("image"),
  createProduct
);

module.exports = router;
