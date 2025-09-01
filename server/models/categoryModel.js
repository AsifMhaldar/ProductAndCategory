import { connectDB } from '../config/db.js';

export const getAllCategories = async () => {
  const db = await connectDB();
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

export const getCategoryById = async (id) => {
  const db = await connectDB();
  const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0];
};

export const createCategory = async (name) => {
  const db = await connectDB();
  const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
  return result;
};

export const updateCategory = async (id, name) => {
  const db = await connectDB();
  const [result] = await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
  return result;
};

export const deleteCategory = async (id) => {
  const db = await connectDB();
  const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
  return result;
};
