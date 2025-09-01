import * as Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const rows = await Product.getProducts();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const result = await Product.createProduct(name, price, category_id);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const result = await Product.updateProduct(req.params.id, name, price, category_id);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteProduct(req.params.id);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};
