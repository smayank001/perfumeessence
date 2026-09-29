import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config/database";
import ProductSchema from "@/lib/models/ProductSchema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const { hotSeller } = await req.json();

  const product = await ProductSchema.findByIdAndUpdate(
    id,
    {
      hotSeller,
    },
    {
      new: true,
    }
  );

  return NextResponse.json(product);
}