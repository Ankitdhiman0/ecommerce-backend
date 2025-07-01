const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoute = require("./routes/protectedRoutes");
const productsRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

//Database Connection
connectDB();

//middlewares
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoute);
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);

// const authRoutes = app.get("/", (req, res) => {
//   res.send("App is running");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
