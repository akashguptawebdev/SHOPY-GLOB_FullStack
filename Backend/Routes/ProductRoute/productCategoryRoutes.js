import express from "express";

import {isAdmin} from "../../MiddleWare/isAuthenticated.js"
import { upload } from "../../MiddleWare/MulterMiddleWare.js";
import { isAuthenticated } from "../../MiddleWare/isAuthenticated.js";
import { createCategory, GetAllCategory } from "../../Controllers/productCategoryControllers.js";

const productCategoryRoutes = express.Router();

productCategoryRoutes.post("/createCategory" ,isAdmin , upload.single('image') ,createCategory)
productCategoryRoutes.get("/getallcategory" ,isAdmin , GetAllCategory)



export default productCategoryRoutes;