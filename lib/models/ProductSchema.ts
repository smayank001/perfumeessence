import mongoose, { Schema } from "mongoose";

const VariantSchema = new Schema({
  label: { type: String, required: true }, 
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    onSale: { type: Boolean, default: false },
    hotSeller: { type: Boolean, default: false },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    images: { type: [String], required: true },
    hasVariants: { type: Boolean, default: false },
    fragranceType: { type: String, default: null },
    variants: { type: [VariantSchema], required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
