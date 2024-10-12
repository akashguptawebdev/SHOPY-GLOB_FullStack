import { ProductModel } from "../Model/ProductModel.js";

// Assuming you're using Express.js
export const searchQuery = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    // Perform search on products by color or other attributes
    const productMatches = await ProductModel.find({
      "attributes.color": { $regex: searchQuery, $options: "i" },
    });

    // Perform search on categories
    const categoryMatch = await Category.findOne({
      name: { $regex: searchQuery, $options: "i" },
    });
    let categoryProducts = [];
    if (categoryMatch) {
      categoryProducts = await Product.find({ category: categoryMatch._id });
    }

    // Combine and return results
    const combinedResults = [...productMatches, ...categoryProducts];
    res.json(combinedResults);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};
