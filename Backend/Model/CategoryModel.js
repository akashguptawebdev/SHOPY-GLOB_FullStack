import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  categoryImage: {
    public_id: String,
    url: String,
    secure_url: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const CategoryModel = mongoose.model("Category", categorySchema);
