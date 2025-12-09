import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./src/features/product/product.routes.js";
//import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartitems.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
dotenv.config();
const server = express();

//cors policy configuration
var corsOptions = {
  origin: "http://loclahost:3000",
  allowedHeaders: "*",
};
server.use(cors(corsOptions));
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "*"); //Content-Type,Authorization or all *
//   res.header("Access-Control-Allow-Methods", "*");
//   //return ok for preflight request
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });
//server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(loggerMiddleware);
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cart", jwtAuth, cartRouter);
server.use("/api/users", userRouter);
const PORT = process.env.PORT || 3500;
//default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecom REST API");
});
//middleware to handle invalid routes is kept at the last so that when none of the routes match,
//  then only it will be executed
server.use((req, res) => {
  res.status(404).send({ message: "API not found" });
});
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
