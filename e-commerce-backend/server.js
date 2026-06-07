const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

config();

const app = express();

app.use(cors());
app.use(express.json());

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

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `Server running on port ${port}`
  );
});
