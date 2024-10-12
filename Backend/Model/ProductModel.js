import mongoose from "mongoose";

// Review schema
const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
    trim: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
    trim: true,
  },
  
  warrantyInformation: {
    type: String,
    default: "1 year warranty",
  },
  shippingInformation: {
    type: String,
    default: "Ships in 2 weeks",
  },
  availabilityStatus: {
    type: String,
    enum: ["In Stock" , "Low Stock" , "Out of Stock"],
  },
  // reviews: [reviewSchema],
  reviews:{

  },
  returnPolicy: {
    type: String,
    default: "30 days return policy",
  },

  images: [
    {
      public_id: String,
      url: String,
      secure_url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// // Middleware to update the updatedAt field before saving
// productSchema.pre("save", function (next) {
//   this.meta.updatedAt = Date.now();
//   next();
// });

export const ProductModel = mongoose.model("Product", productSchema);
