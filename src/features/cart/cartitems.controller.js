import CartItemModel from "./cartitems.model.js";
export default class CartItemsController {
  add(req, res) {
    console.log(req.query);
    const { productId, quantity } = req.query;
    const userId = req.userId; //coming from payload from jwt auth middleware
    CartItemModel.add(productId, userId, quantity);
    return res.status(201).send({ message: "Item added to cart" });
  }
  get(req, res) {
    const userId = req.userId;
    const cartItems = CartItemModel.get(userId);
    return res.status(200).send(cartItems);
  }
  delete(req, res) {
    const userId = req.userId;
    const cartItemId = req.params.id;
    console.log("Deleting item with id:", cartItemId, "for user:", userId);
    const result = CartItemModel.delete(cartItemId, userId);
    if (result === true) {
      return res.status(200).send({ message: "Item removed from cart" });
    } else {
      return res.status(404).send({ message: result });
    }
  }
}
