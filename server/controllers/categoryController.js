import * as Category from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category", error: err.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Category.createCategory(name);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Category.updateCategory(req.params.id, name);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const result = await Category.deleteCategory(req.params.id);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};
