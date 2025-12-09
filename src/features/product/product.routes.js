//manage routes and paths to product controller
import express from "express";
import { upload } from "../../middlewares/fileupload.middleware.js";
import ProductController from "./product.controller.js";
const productController = new ProductController();
const productRouter = express.Router();
productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.post("/rate", productController.rateProduct);
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/rate", productController.rateProduct);

export default productRouter;
