import { connectDB } from "@/lib/config/database";
import ProductSchema from "@/lib/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const connected = await connectDB();
  if (!connected) return NextResponse.json({ products: [] }, { status: 503 });

  // Extract query string
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  // Search case-insensitively in name or description
  const products = await ProductSchema.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  });

  return NextResponse.json({ products });
}
