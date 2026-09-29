import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database";
import { generateSKU } from "@/lib/helpers";
import ProductSchema from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    const connected = await connectDB();
    if (!connected) return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });

    const {id} = (await params)

    try{
        const res = await ProductSchema.findById(id)
        return NextResponse.json({success: true, message: "Product Found", data: res}, {status: 200})
    }catch(err){
        return NextResponse.json({success: false, message: "Failed to fetch data"}, {status: 500})
    }

}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const connected = await connectDB();
  if (!connected) return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });
  const id = (await params).id;

  try {
    const contentType = req.headers.get("content-type");

    //  Handle image deletion
    if (contentType?.includes("application/json")) {
          const body = await req.json();
          if (body.action === "deleteImage") {
            await ProductSchema.findByIdAndUpdate(id, { $pull: { images: body.imageUrl } });
            return NextResponse.json({ success: true });
          }
        }

    // Handle form data update
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const salePrice = Number(formData.get("salePrice"));
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const rawVariants = formData
        .getAll("variants")
        .filter((x): x is string => typeof x === "string")
        .map(v => JSON.parse(v));
    const keywords = formData
    .getAll("keywords")
    .filter((x): x is string => typeof x === "string")
    .map((x) => JSON.parse(x));
    const fragranceType = formData.get("fragranceType") as string
    const onSale = formData.get("onSale") === "true";
    const hasVariants = formData.get("hasVariants") === "true";
    const files = formData.getAll("images") as File[];
    const uploadedImages: string[] = [];


    const variants = (rawVariants.length
          ? rawVariants
          : [{ label: "Default", stock: 0 }]
        ).map((v: any) => {
          if (!v.label || v.stock === undefined) {
            throw new Error("Invalid variant data");
          }

          const attrValue = hasVariants ? v.label : "STD";

          return {
            label: v.label,
            stock: Number(v.stock),
            sku: generateSKU({
              category,
              productName: name,
              attr: attrValue,
            }),
          };
        });

    for (const file of files) {
         if (typeof file === "string" || !file?.arrayBuffer) {
          console.log("Skipping invalid file:", file);
          continue; // Skip invalid entries
        }
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "The Perfume Essence" }, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }).end(buffer);
      });
      uploadedImages.push((uploadRes as any).secure_url);
    }

     // 🔹 Fetch existing product to merge images
    const existingProduct = await ProductSchema.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Merge existing images with newly uploaded images
    const updatedImages = [...existingProduct.images, ...uploadedImages];

    // Build update object
    const updateQuery = {
      name,
      slug,
      description,
      price,
      salePrice,
      category,
      keywords,
      variants,
      onSale,
      hasVariants,
      fragranceType,
      images: updatedImages,
    };
    // Update in DB
    const updatedProduct = await ProductSchema.findByIdAndUpdate(id, updateQuery, { new: true });

    return NextResponse.json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (err: any) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product", error: err.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const connected = await connectDB();
  if (!connected) return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });
  const id = (await params).id;

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
};
