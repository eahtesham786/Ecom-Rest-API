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
