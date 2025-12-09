import express from "express";
import CartItemsController from "./cartitems.controller.js";

const cartItemsController = new CartItemsController();
const cartRouter = express.Router();
cartRouter.post("/", cartItemsController.add);
cartRouter.get("/", cartItemsController.get);
cartRouter.delete("/:id", cartItemsController.delete);

export default cartRouter;
