import mysql from 'mysql2/promise';

let db;

export const connectDB = async () => {
  if (!db) {
    
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.DBUSER,
      password: process.env.PASSWORD
    });

    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\``);
    console.log("Database Created...");

   
    db = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.DBUSER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });

  
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);

    console.log("Tables Created...");
  }
  return db;
};

export const getDB = () => db;
