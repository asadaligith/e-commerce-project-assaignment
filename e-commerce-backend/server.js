const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");

const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const checkoutRoutes = require("./routes/checkout.routes");


config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");



const startServer = async () => {
  try {
     await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/api", checkoutRoutes);



