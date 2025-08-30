import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let db;
(async () => {
    db = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DBUSER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
})();

// app.get('/', async (req, res) => {
//     try {
//         const [rows] = await db.query("SELECT * FROM products");
//         res.json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Error inside server", error: err.message });
//     }
// });


app.get('/categories', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM categories");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
});

app.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT products.id, products.name, products.price, categories.name AS category
            FROM products
            LEFT JOIN categories ON products.category_id = categories.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error inside server", error: err.message });
    }
});


app.post('/create', async (req, res) => {
    const sql = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.price, req.body.category_id];
    try {
        const [result] = await db.query(sql, values);
        res.json({ result });
    } catch (err) {
        console.error("Error creating product:", err); // Log error to terminal
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
});

app.post('/categories', async (req, res) => {
    const sql = "INSERT INTO categories (name) VALUES (?)";
    const values = [req.body.name];
    try {
        const [result] = await db.query(sql, values);
        res.json({ result });
    } catch (err) {
        console.error("Error creating category:", err); // Log error to terminal
        res.status(500).json({ message: "Error creating category", error: err.message });
    }
});


app.get('/products/:id', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT products.id, products.name, products.price, categories.name AS category
            FROM products
            LEFT JOIN categories ON products.category_id = categories.id
            WHERE products.id = ?
        `, [req.params.id]);
        res.json(rows[0] || null); // Return single object or null
    } catch (err) {
        res.status(500).json({ message: "Error inside server", error: err.message });
    }
});


app.put('/update/:id', async (req, res) => {
    const sql = "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, req.body.category_id, req.params.id];
    try {
        const [result] = await db.query(sql, values);
        res.json({ result });
    } catch (err) {
        console.error("Error updating product:", err); // Log error for debugging
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const sql = "DELETE FROM products WHERE id = ?";
    try {
        const [result] = await db.query(sql, [req.params.id]);
        res.json({ result });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Error deleting product", error: err.message });
    }
});


app.delete('/categories/:id', async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category", error: err.message });
    }
});

app.put('/editCategory/:id', async (req, res) => {
    const sql = "UPDATE categories SET name = ? WHERE id = ?";
    const values = [req.body.name, req.params.id];
    try {
        const [result] = await db.query(sql, values);
        res.json({ result });
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ message: "Error updating category", error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});