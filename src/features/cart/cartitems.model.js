export default class CartItemModel {
  constructor(productId, userId, quantity, id) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }
  static add(productId, userId, quantity) {
    const cartItem = new CartItemModel(productId, userId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    console.log(cartItems);
    return cartItem;
  }
  static get(userId) {
    return cartItems.filter((item) => item.userId === userId);
  }
  static delete(cartItemId, userId) {
    cartItemId = parseInt(cartItemId);
    const cartItemIndex = cartItems.findIndex(
      (item) => item.id === cartItemId && item.userId === userId
    );
    if (cartItemIndex == -1) {
      return "Item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
      return true;
    }
  }
}
var cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(1, 2, 1, 2)];
