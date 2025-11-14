const express = require("express");
const router = express.Router();
const { getDB, ObjectId } = require("../db/db");

router.post("/addcart", async (req, res) => {
  try {
    const { eCommerce, eCommerceCart } = getDB();
    const cartItem = req.body.orderedItems || req.body;

    for (const item of cartItem) {
      const productId = new ObjectId(item.products._id);
      const quantity = item.qty;

      const product = await eCommerce.findOne({ _id: productId });
      console.log("🛒 Received Cart Items:", product);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`,
        });
      }
      await eCommerce.updateOne(
        { _id: productId },
        { $inc: { stock: -quantity } }
      );
      console.log(`Stock updated for ${product.name}: -${quantity}`);
    }
    const addItem = await eCommerceCart.insertMany(cartItem);
    console.log(addItem);
    res.status(200).json({
      success: true,
      message: "Order placed successfully & stock updated",
      data: addItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
});

router.get("/orderedItems", async (req, res) => {
  try {
    const { eCommerceCart } = getDB();
    const orders = await eCommerceCart.find();
    const ordersList = await orders.toArray();
    return res.status(200).json(ordersList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

router.delete("/cancelOrder/:id", async (req, res) => {
  try {
    const { eCommerce, eCommerceCart } = getDB();
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const cancelledOrder = await eCommerceCart.findOne({ _id: objectId });

    if (cancelledOrder.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already deleted",
      });
    }
    const productId = new ObjectId(cancelledOrder.products._id);
    const qtyToRestore = cancelledOrder.qty;
    console.log(qtyToRestore);

    await eCommerce.updateOne(
      { _id: productId },
      { $inc: { stock: +qtyToRestore } }
    );
    console.log(
      `Stock restored for ${cancelledOrder.products.name}: +${qtyToRestore}`
    );

    await eCommerceCart.deleteOne({ _id: objectId });
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully & Stock restored",
    });
  } catch (error) {
    console.error(" Error cancelling order:", error.message);
    res.status(500).json({
      success: false,
      message: "Error cancelling order",
      error: error.message,
    });
  }
});

module.exports = router;
