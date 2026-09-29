import cloudinary, { isCloudinaryConfigured } from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database";
import { Media } from "@/lib/models/MediaSchema";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const media = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: media });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("media");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Media file is required" },
        { status: 400 }
      );
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Media uploads require CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local.",
        },
        { status: 503 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "The Perfume Essence",
            resource_type: isVideo ? "video" : "image",

            // 🔥 VIDEO OPTIMIZATION
            ...(isVideo && {
              transformation: [
                { quality: "auto" },
                { fetch_format: "mp4" },
                { width: 1280, crop: "limit" },
                { video_codec: "h264" },
              ],
            }),

            // 🔥 IMAGE OPTIMIZATION
            ...(!isVideo && {
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            }),
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const media = await Media.create({
      media: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      mediaType,
    });

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error(error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
