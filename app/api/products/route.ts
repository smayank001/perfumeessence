import cloudinary, { isCloudinaryConfigured } from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database"
import { generateSKU } from "@/lib/helpers";
import ProductSchema from "@/lib/models/ProductSchema"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs";

export const GET = async () => {
    const connected = await connectDB();

    if (!connected) {
        return NextResponse.json({ message: "Database connection failed" }, { status: 503 });
    }

    try{
        const products = await ProductSchema.find({})

        if(products){
            return NextResponse.json({message: "Fetched Successfully", data: products}, {status: 200})
        }else{
            return NextResponse.json({message: "Failed to fetched data", data: []}, {status: 404})
        }
    }catch(err){
        return NextResponse.json({message: "Failed fetching Products"})
    }
}


/* ---------- POST ---------- */
export const POST = async (req: NextRequest) => {
  const connected = await connectDB();

  if (!connected) {
    return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });
  }

  try {
    const formData = await req.formData();

    /* ---------- BASIC FIELDS ---------- */
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const price = Number(formData.get("price"));
    const salePrice = Number(formData.get("salePrice"));
    const onSale = formData.get("onSale") === "true";
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const fragranceType = formData.get("fragranceType") as string | null;
    const hasVariants = formData.get("hasVariants") === "true"

    const keywords = formData
      .getAll("keywords")
      .filter((x): x is string => typeof x === "string")
      .map(x => JSON.parse(x));

    const rawVariants = formData
      .getAll("variants")
      .filter((x): x is string => typeof x === "string")
      .map(v => JSON.parse(v));

    const files = formData.getAll("images");

    if (!name || !slug || !price || !category || !description) {
      throw new Error("Missing required fields");
    }

    if (!files || files.length === 0) {
      throw new Error("No images uploaded");
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image uploads require CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local.",
        },
        { status: 503 }
      );
    }

    /* ---------- VARIANT BUILD ---------- */
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

    /* ---------- IMAGE UPLOAD ---------- */
    const uploadedImages: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        throw new Error("Invalid file format");
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "The Perfume Essence", resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    /* ---------- SAVE PRODUCT ---------- */
    const newProduct = new ProductSchema({
      name,
      slug,
      price,
      onSale,
      salePrice,
      category,
      description,
      keywords,
      fragranceType,
      images: uploadedImages,
      hasVariants,
      variants,
    });

    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully", data: newProduct },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add product";
    console.error("❌ Product upload error:", err);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
};
