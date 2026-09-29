import cloudinary from "@/lib/config/cloudinary";
import { connectDB } from "@/lib/config/database";
import { getAdminNewOrderEmail, getOrderConfirmationEmail } from "@/lib/helpers/nodemailer";
import order from "@/lib/models/OrderSchema";
import ProductSchema from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async (req: NextRequest) => {
  const connected = await connectDB();
  if (!connected) return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });

  try {
    const orders = await order.find({})

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const connected = await connectDB();
  if (!connected) return NextResponse.json({ success: false, message: "Database connection failed" }, { status: 503 });

  try {
    const formData = await req.formData();
    const orderData = JSON.parse(formData.get("orderData") as string);
    const paymentProofFile = formData.get("paymentProof") as File | null;

    const uploadedImages : string[] = []

    if (paymentProofFile && typeof paymentProofFile === "object") {
      const arrayBuffer = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "The Perfume Essence",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              )
              .end(buffer);
          });

          uploadedImages.push(uploadResult.secure_url);
        }


    const newOrder = await order.create({
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      shippingCost: orderData.shippingCost,
      userDetails: orderData.userDetails,
      notes: orderData.notes,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentProof: uploadedImages[0] || null,
      createdAt: new Date(),
    });

   await Promise.all(
      orderData.items.map((product: any) =>
        ProductSchema.updateOne(
          { _id: product.productId, "variants.label": product.variant },
          { $inc: { "variants.$.stock": -product.quantity } }
        )
      )
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminHtml = getAdminNewOrderEmail(newOrder);

    await transporter.sendMail({
      from: `"The Perfume Essence"`,
      to: "tahamudassar811@gmail.com",
      subject: "New Order Received",
      html: adminHtml,
    });

    const customerHtml = getOrderConfirmationEmail(newOrder)


    await transporter.sendMail({
      from: `"The Perfume Essence Order"`,
      to: orderData.userDetails.email,
      subject: "Your Order Has Been Placed 🎉",
      html: customerHtml,
    });


    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order." },
      { status: 500 }
    );
  }
};
