const express = require("express");
const router = express.Router();

const productData = require("../product.json");

router.get("/", (req, res) => {
  res.json({
    products: productData.products,
  });
});

module.exports = router;