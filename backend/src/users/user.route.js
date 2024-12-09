/** @format */

const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username });

    if (!admin) {
      res.status(404).send({ message: "Admin not found!" });
    }

    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Authentication Successful!",
      token,
      user: { username: admin.username, role: admin.role },
    });
  } catch (err) {
    console.log("Failed to login as admin!", err);
    res.status(401).send({ message: "Invalid credentials!", err });
  }
});

module.exports = router;
