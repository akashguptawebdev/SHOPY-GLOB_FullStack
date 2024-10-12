import { ProductModel } from "../Model/ProductModel.js";
import { CategoryModel } from "../Model/CategoryModel.js";
import mongoose from "mongoose";
import { check, validationResult } from "express-validator";
import getDataUri from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/CloudinaryConfig.js";

export const createProduct = async (req, res, next) => {
  try {
    // Extract data from request body
    const {
      title,
      price,
      finalPrice,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      description,
      returnPolicy,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
    } = req.body;
    const { file } = req;

    const newProduct = {
      title,
      price,
      finalPrice,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      description,
      returnPolicy,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
    };
    
    // Handle file upload to Cloudinary
    let uploadResult;
    if (file) {
      // Configure Cloudinary
      cloudinaryConfig();

      // File data parsing
      const fileData = getDataUri(file);

      // Upload file to Cloudinary
      uploadResult = await cloudinary.uploader.upload(fileData.content, {
        public_id: `product_photo_${title + Math.floor(Math.random() * 50)}`,
        resource_type: "auto",
      });
    }

    newProduct["images"]=uploadResult;
 

 
    // Create a new product instance
    const product = await ProductModel.create({
      ...newProduct,
    });
  
    // Respond with the newly created product
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    next(err); // Pass the error to the global error handler
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const allProduct = await ProductModel.find();

    if (allProduct.length === 0) {
      return res.status(404).json({
        message: "No parent categories found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All Product Successfully Fetched",
      success: true,
      allProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {};

export const updateProduct = async (req, res, next) => {};

export const deleteProduct = async (req, res, next) => {};

export const searchProducts = async (req, res, next) => {};
export const getProductsByCategory = async (req, res, next) => {};
