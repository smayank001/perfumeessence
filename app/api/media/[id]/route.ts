import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database";
import { Media } from "@/lib/models/MediaSchema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    // ✅ DELETE FROM CLOUDINARY
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.mediaType === "video" ? "video" : "image",
    });

    // ✅ DELETE FROM DB
    await Media.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
