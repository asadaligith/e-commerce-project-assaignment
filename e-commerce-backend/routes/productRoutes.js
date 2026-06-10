const express = require("express");
const router = express.Router();

const productData = require("../product.json");

// All products
router.get("/", (req, res) => {
  res.json({
    products: productData.products,
  });
});

// Search products
router.get("/search", (req, res) => {
  try {
    const query = (req.query.q || "").trim().toLowerCase();

    if (!query) {
      return res.json({
        products: [],
        total: 0,
      });
    }

    const products = productData.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

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
router.get("/:id", (req, res) => {
  try {
    const product = productData.products.find(
      (item) => item.id === Number(req.params.id)
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

module.exports = router;