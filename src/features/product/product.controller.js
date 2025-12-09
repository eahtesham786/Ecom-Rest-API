import ProductModel from "./product.model.js";
export default class ProductController {
  getAllProducts(req, res) {
    // Logic to get all products
    let result = ProductModel.getAll();
    res.send(result);
  }

  addProduct(req, res) {
    // Logic to create a new product
    console.log(req.body);
    console.log(req.file);
    console.log("This is a post request");
    const { name, price, sizes } = req.body;
    const imageUrl = req.file.filename;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.addProduct(newProduct);
    res.status(201).send(createdRecord);
  }
  getProduct(req, res) {
    const productId = req.params.id;
    console.log(typeof productId);
    console.log("Fetching product with ID:", productId);
    const product = ProductModel.get(productId);
    console.log(product);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    } else {
      return res.status(200).send(product);
    }
  }
  rateProduct(req, res) {
    // Logic to rate a product
    console.log(req.query);
    const userId = req.query.userId;
    const productId = req.query.productId;
    const rating = req.query.rating;
    const error = ProductModel.rateProduct(userId, productId, rating);
    if (error) {
      return res.status(400).send({ message: error });
    } else {
      return res.status(200).send({ message: "Rating submitted successfully" });
    }
  }
  filterProducts(req, res) {
    // Logic to filter products based on criteria
    const { minPrice, maxPrice, category } = req.query;
    console.log("Filtering products with:", minPrice, maxPrice, category);
    let result = ProductModel.filter(minPrice, maxPrice, category);
    console.log(result);
    res.status(200).send(result);
  }
}
