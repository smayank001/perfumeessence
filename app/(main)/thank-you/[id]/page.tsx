import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Order from "@/lib/models/OrderSchema";
import { connectDB } from "@/lib/config/database";
import MetaPurchase from "@/components/admin/MetaPurchase";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  salePrice: number | null;
  finalPrice: number;
  quantity: number;
  image: string;
  variant: string;
  onSale: boolean;
}

export const generateMetadata = (): Metadata => ({
  title: "Thank You",
});

const ThankYouPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await connectDB();

  const {id} = await params

  const order = await Order.findById(id).lean();


  return (
    <main className="flex pt-28 justify-center items-center min-h-screen bg-gray-50 px-4">
       <MetaPurchase
        orderId={order._id.toString()}
        totalPrice={order.totalPrice}
        items={order.items.map((item: OrderItem) => ({
          productId: item.productId.toString(),
          quantity: item.quantity,
        }))}
      />

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">

        <CheckCircle size={40} className="mx-auto text-green-600 mb-4" />

        <h1 className="text-2xl font-bold text-center mb-2">
          Thank you for your order!
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Your order has been placed successfully. We’ll contact you shortly.
        </p>

        {/* Order Info */}
        <div className="border-t pt-4 text-sm space-y-1">
          <p><strong>Order ID:</strong> <span className="uppercase"> {order.orderId.slice(0,7)} </span></p>
          <p><strong>Name:</strong> {order.userDetails.fullName}</p>
          <p><strong>Phone:</strong> {order.userDetails.phone}</p>
          <p><strong>Email:</strong> {order.userDetails.email || "-"}</p>
          <p>
            <strong>Address:</strong> {order.shippingAddress.address}
          </p>
        </div>

        {/* Items */}
        <div className="mt-6 space-y-4">
          {order.items.map((item: OrderItem, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex gap-3 items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded object-cover border"
                />

                <div>
                  <p className="font-semibold">
                    {item.name}
                    {item.variant !== "default" && (
                      <span className="text-sm text-gray-500">
                        {" "}({item.variant})
                      </span>
                    )}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {item.quantity} × ₹{item.finalPrice}
                  </p>
                </div>
              </div>

              <p className="font-semibold">
                ₹{item.quantity * item.finalPrice}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {order.shippingCost === 0
                ? "Free"
                : `₹${order.shippingCost}`}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total</span>
            <span>₹{order.totalPrice}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="block mt-6 bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
};

export default ThankYouPage;
