import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


connectDB()
  .then(() => console.log("Database ready"))
  .catch(err => {
    process.exit(1);
  });


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


// app.get('/', (req, res) => {
//   res.send('API is running...');
// });


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
