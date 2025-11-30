const express = require("express");
const router = express.Router();
const { getDB, ObjectId } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, isAdmin } = require("../middleware/middleware");

const secretKey = "your-secret-key";

router.post("/register", async (req, res) => {
  try {
    const { eCommerceUser } = getDB();

    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await eCommerceUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerDetail = await eCommerceUser.insertOne({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", registerDetail });
    console.log(` User registered: ${email}`);
  } catch (error) {
    res.status(401).json({ message: "Register Failed:", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { eCommerceUser } = getDB();
    const { email, password } = req.body;

    const user = await eCommerceUser.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    const isValidUser = await bcrypt.compare(password, user.password);

    if (!isValidUser) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
      email: user.email,
    });

    console.log(`Login Success → ${email} | Role: ${user.role}`);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.role });
});

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
