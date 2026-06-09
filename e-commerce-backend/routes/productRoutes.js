const express = require("express");
const router = express.Router();

const productData = require("../product.json");

router.get("/", (req, res) => {
  res.json({
    products: productData.products,
  });
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = productData.products.find(
    (item) => item.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

module.exports = router;