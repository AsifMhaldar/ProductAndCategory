import { connectDB } from '../config/db.js';

export const getProducts = async () => {
  const db = await connectDB();
  const [rows] = await db.query(`
    SELECT p.id, p.name, p.price,
           c.name AS category, p.category_id
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `);
  return rows;
};

export const getProductById = async (id) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT products.id, products.name, products.price, 
            products.category_id, categories.name AS category
     FROM products
     LEFT JOIN categories ON products.category_id = categories.id
     WHERE products.id = ?`,
    [id]
  );
  return rows[0];
};


export const createProduct = async (name, price, category_id) => {
  const db = await connectDB();
  const [result] = await db.query(
    "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)",
    [name, price, category_id]
  );
  return result;
};

export const updateProduct = async (id, name, price, category_id) => {
  const db = await connectDB();
  const [result] = await db.query(
    "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?",
    [name, price, category_id, id]
  );
  return result;
};

export const deleteProduct = async (id) => {
  const db = await connectDB();
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return result;
};
