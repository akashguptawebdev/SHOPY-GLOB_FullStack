import { CategoryModel } from "../Model/CategoryModel.js";
// import { ParentCategoryModel } from "../Model/parentCategoryModel.js";
import getDataUri from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/CloudinaryConfig.js";
import mongoose from "mongoose";
export const createCategory = async (req, res, next) => {
  try {
    const { name, description} = req.body;

    if (!name || !description ) {
      return res.status(400).json({
        message: "Required all fields",
        success: false,
      });
    }
    const file = req.file;

    const newCategory = {
      name,
      description,
      
    }

    let uploadResult;
    if (file) {
      // Configure Cloudinary
      cloudinaryConfig();

      // File data parsing
      const fileData = getDataUri(file);

      // Upload file to Cloudinary
      uploadResult = await cloudinary.uploader.upload(fileData.content, {
        public_id: `profile_photo_${name + Math.floor(Math.random() * 50)}`,
        resource_type: "auto",
      });
    }

    if (!uploadResult) {
      return res.status(500).json({
        message: "Failed to upload image",
        success: false,
      });
    }

    newCategory["categoryImage"] = uploadResult;


    // Create a new product instance
    const Category = await CategoryModel.create({...newCategory});



    // Respond with the newly created category
    res
      .status(200)
      .json({
        message: "Category created successfully",
        success: true,
        newCategory,
      });
  } catch (err) {
    next(err);
  }
};

export const GetAllCategory = async (req, res, next) =>{
  const category = await CategoryModel.find();

  res.status(200).json({
    message:"Category Fetched Sucessfully",
    success:true,
    category
  })
}
