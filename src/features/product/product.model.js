import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(id, name, price, description, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }
  static getAll() {
    return products;
  }
  static addProduct(product) {
    product.id = products.length + 1;
    products.push(product);
    console.log(products);
    return product;
  }
  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }
  static filter(minPrice, maxPrice, category) {
    const result = products.filter((p) => {
      return (
        (!minPrice || p.price >= minPrice) &&
        (!maxPrice || p.price <= maxPrice) &&
        (!category || p.category === category)
      );
    });
    return result;
  }
  static rateProduct(userId, productId, rating) {
    //validate if user exists
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      return "User not found";
    }
    //validate if product exists
    const product = products.find((p) => p.id == productId);
    if (!product) {
      return "Product not found";
    }
    //check if rating is present if not then add new rating
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userId: userId, rating: rating }); //store two things who is giveing rating- the userId and rating
    } else {
      //check if user has already rated the product
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId == userId
      );
      if (existingRatingIndex >= 0) {
        //update existing rating
        product.ratings[existingRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        //if no existing rating, add new rating
        product.ratings.push({ userId: userId, rating: rating });
      }
    }
  }
}
var products = [
  new ProductModel(
    1,
    "Product 1",
    29.99,
    "Description for product 1",
    "https://via.placeholder.com/150",
    "Category A",
    "M"
  ),
  new ProductModel(
    2,
    "Product 2",
    49.99,
    "Description for product 2",
    "https://via.placeholder.com/150",
    "Category B",
    "L"
  ),
  new ProductModel(
    3,
    "Product 3",
    19.99,
    "Description for product 3",
    "https://via.placeholder.com/150",
    "Category A",
    "S"
  ),
];
