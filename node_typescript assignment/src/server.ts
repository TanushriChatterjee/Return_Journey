import express from "express";
require('dotenv').config();
import productRoutes from './routes/productRoute';
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";

const app = express();

const PORT = process.env.PORT;

// Use middleware to parse JSON
app.use(express.json());

// Use the request logger middleware for all routes
app.use(requestLoggerMiddleware);

// Use the product routes
app.use('/api', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;