import express from "express";
import { upload } from "../../MiddleWare/MulterMiddleWare.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  updateProduct,
} from "../../Controllers/productControllers.js";
import {isAdmin} from "../../MiddleWare/isAuthenticated.js"
const route = express.Router();

route.post("/createProduct",isAdmin , upload.single('images'), createProduct);
route.get("/" , getAllProducts);
route.get("/:id", getProductById);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);
route.get("/search", searchProducts);
route.get("/category/:categoryId", getProductsByCategory);

export default route;
