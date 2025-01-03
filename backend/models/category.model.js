import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    items: {
      type: [itemSchema],
      required:false
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Category = mongoose.model("Category", categorySchema); //mongoose will pluralize the name Category as categories in the salame_electric db.

export default Category;
