/** @format */

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bookRouter = require("./src/books/book.route.js");
const orderRouter = require("./src/orders/order.route.js");
const userRouter = require("./src/users/user.route.js");
const adminRouter = require("./src/stats/admin.stats.js");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

main();

app.use("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
