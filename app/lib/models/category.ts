import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
