/** @format */

const express = require("express");
const { createAnOrder, getOrderByEmail } = require("./order.controller");

const router = express.Router();

router.post("/", createAnOrder);
router.get("/email/:email", getOrderByEmail);

module.exports = router;
