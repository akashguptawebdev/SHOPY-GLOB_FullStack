import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./Routes/userRoutes/userRouter.js"; // Ensure correct path to userRouter
import bodyParser from "body-parser";
import ErrorMiddleware from "./MiddleWare/ErrorMiddleware.js"
import cookieParser from 'cookie-parser'
import productRoute from "./Routes/ProductRoute/ProductRoutes.js"
import productCategoryRoutes from "./Routes/ProductRoute/productCategoryRoutes.js";
import cartRoute from "./Routes/CartRoutes/cartRoute.js";
import orderRoute from "./Routes/orderRoutes.js";
import searchRoute from "./Routes/searchRoute.js"
import cors from "cors"
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })); // Helps to parse form data
app.use(cookieParser())
// CORS configuration to allow requests from specific origins
const corsOptions = {
  origin: 'https://shopy-glob-full-stack.vercel.app', // The front-end URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/category" , productCategoryRoutes)
app.use("/api/v1/cart",cartRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/search",searchRoute);

// Password Reseting
app.use(UserRoutes);

app.get("/", (req, res) => {
  res.json("Home Route");
});


// Global Error Handler
app.use(ErrorMiddleware)

// Export the configured app
export default app;
