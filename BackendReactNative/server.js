const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
var bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const promoRouter = require("./routes/promoRoute");
const searchRoute = require("./routes/searchRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/promo", promoRouter);
app.use("/search", searchRoute);
app.use("/order", orderRoute);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running at ${PORT}`);
});
