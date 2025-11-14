const express = require("express");
const router = express.Router();
const { getDB, ObjectId } = require("../db/db");

router.get("/products", async (req, res) => {
  try {
    const { eCommerce } = getDB();
    const products = await eCommerce.find();
    const productList = await products.toArray();
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const { eCommerce } = getDB();
    const id = req.params.id;
    const objectId = { _id: new ObjectId(id) };
    const products = await eCommerce.findOne(objectId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

module.exports = router;
