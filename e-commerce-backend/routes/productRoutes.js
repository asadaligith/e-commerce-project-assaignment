const express = require("express");
const router = express.Router();

const productData = require("../product.json");

router.get("/", (req, res) => {
  res.json({
    products: productData.products,
  });
});


router.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").trim();

    if (!query) {
      return res.json({ products: [], total: 0, skip: 0, limit: 30 });
    }

    const regex = new RegExp(query, "i");
    const products = await Product.find({
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    }).sort({ createdAt: -1 });

    res.json({
      products: products.map((p) => p.toJSON()),
      total: products.length,
      skip: 0,
      limit: products.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ productId: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;