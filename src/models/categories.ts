import mongoose from "mongoose";
import { CategoryResult } from "@/types/category";
import { categories } from "@/data/homepage";

export interface Category extends mongoose.Document {
  date: string;
  results: CategoryResult[];
}

const categoryModels: { [key: string]: mongoose.Model<Category> } = {};

categories.forEach((category) => {
  const schema = new mongoose.Schema<Category>({
    date: {
      type: String,
      required: [true, "Date is required for this category"],
      unique: true,
    },
    results: [Object],
  });
  categoryModels[category.value] = mongoose.model<Category>(
    `${category.name}`,
    schema
  );
});

export default categoryModels;
