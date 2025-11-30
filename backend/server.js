const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { run, client } = require("./db/db");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

app.use(express.json());
//app.use(cors());
//app.use(
//  cors({
//    origin: ["https://ecommerce-v1-xvv0.onrender.com", "http://localhost:3000"], // your deployed frontend URL
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    credentials: true,
//  })
//);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecommerce-v1-xvv0.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", userRoutes);

run()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB and start server:", error);
  });
