import express, { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController";

const router: Router = express.Router();

// Define routes
router.route("/products").get(getAllProducts).post(addProduct);
router
  .route("/products/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export default router;