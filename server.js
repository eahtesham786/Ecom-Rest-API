import express from "express";
import productRouter from "./src/features/product/product.route.js";
import bodyParser from "body-parser";
const server = express();
server.use(bodyParser.json());
server.use("/api/products", productRouter);
const PORT = process.env.PORT || 3500;
server.get("/", (req, res) => {
  res.send("Welcome to Ecom REST API");
});
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
