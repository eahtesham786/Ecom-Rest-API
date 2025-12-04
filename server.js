import express from "express";
import productRouter from "./src/features/product/product.route.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
const server = express();
server.use(bodyParser.json());
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);
const PORT = process.env.PORT || 3500;
server.get("/", (req, res) => {
  res.send("Welcome to Ecom REST API");
});
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
