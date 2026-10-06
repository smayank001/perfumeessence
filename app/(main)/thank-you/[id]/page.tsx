import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiShoppingBag, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';
import type { Metadata } from 'next';
import Order from '@/lib/models/OrderSchema';
import { connectDB } from '@/lib/config/database';
import MetaPurchase from '@/components/admin/MetaPurchase';

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
  title: 'Order Confirmed — THE PERFUME ESSENCE',
  description: 'Thank you for your order at THE PERFUME ESSENCE.',
});

const ThankYouPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await connectDB();

  const { id } = await params;

  let order: any = null;
  try {
    order = await Order.findById(id).lean();
  } catch (e) {
    console.error(e);
  }

  if (!order) {
    return (
      <main className="min-h-screen flex items-center justify-center font-serif px-4">
        <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-10 text-center max-w-md w-full shadow-sm">
          <h1 className="text-2xl text-[#21132F] font-normal mb-2">Order Not Found</h1>
          <p className="text-xs text-[#6E6472] mb-6">
            We could not locate this order record in our atelier archives.
          </p>
          <Link href="/" className="btn-luxury-primary w-full">
            Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-10 font-serif flex items-center justify-center">
      <MetaPurchase
        orderId={order._id.toString()}
        totalPrice={order.totalPrice}
        items={order.items.map((item: OrderItem) => ({
          productId: item.productId.toString(),
          quantity: item.quantity,
        }))}
      />

      <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-6 sm:p-10 md:p-12 max-w-2xl w-full shadow-md">
        {/* Certificate Seal */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#F5F0F7] border border-[#C8A45D] flex items-center justify-center mx-auto mb-4 text-[#21132F]">
            <FiCheck className="w-7 h-7 text-[#C8A45D]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8A45D] block mb-1 font-normal">
            ORDER ACQUIRED & CONFIRMED
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#21132F] font-normal tracking-tight">
            Thank You, {order.userDetails.fullName?.split(' ')[0] || 'Patron'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6472] mt-2 max-w-md mx-auto font-normal leading-relaxed">
            Your order has been recorded in the Atelier. Our compounding specialists are preparing your shipment with insured protective packaging.
          </p>
        </div>

        {/* Order Identifier Strip */}
        <div className="bg-[#F5F0F7] border border-[#D8CEDA] p-4 flex flex-wrap items-center justify-between gap-3 text-xs mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68447F] block">
              Order Reference
            </span>
            <span className="font-sans font-medium text-[#21132F] tracking-wider uppercase text-sm">
              #{order.orderId ? order.orderId.slice(0, 8) : order._id.toString().slice(-8)}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68447F] block">
              Payment Method
            </span>
            <span className="text-[#21132F] capitalize">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Bank Transfer'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68447F] block">
              Status
            </span>
            <span className="text-[#21132F] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" /> Confirmed
            </span>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="border-b border-[#F5F0F7] pb-6 mb-6 text-xs text-[#6E6472] space-y-1.5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#21132F] font-medium block mb-2">
            Dispatched To:
          </span>
          <p className="text-[#21132F] font-medium text-sm">{order.userDetails.fullName}</p>
          <p>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode !== 'N/A' ? `— ${order.shippingAddress.postalCode}` : ''}</p>
          <p>Contact: {order.userDetails.phone} {order.userDetails.email !== 'No email' ? `• ${order.userDetails.email}` : ''}</p>
        </div>

        {/* Items List */}
        <div className="space-y-4 mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#21132F] font-medium block">
            Acquired Selections
          </span>
          {order.items.map((item: OrderItem, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center py-2.5 border-b border-[#F5F0F7]"
            >
              <div className="flex gap-3.5 items-center">
                <div className="w-12 h-14 bg-[#F5F0F7] relative flex-shrink-0 border border-[#D8CEDA] overflow-hidden">
                  <Image
                    src={item.image || '/Images/logo.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-normal text-[#21132F]">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#6E6472]">
                    {item.quantity} × ₹{item.finalPrice.toLocaleString()} {item.variant && item.variant !== 'default' ? `• (${item.variant})` : ''}
                  </p>
                </div>
              </div>

              <span className="text-xs sm:text-sm font-normal text-[#21132F]">
                ₹{(item.quantity * item.finalPrice).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="border-t border-[#D8CEDA] pt-4 space-y-2 text-xs text-[#6E6472]">
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-[#21132F]">
              {order.shippingCost === 0 ? 'Complimentary' : `₹${order.shippingCost}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-normal text-[#21132F] pt-2 border-t border-[#F5F0F7]">
            <span className="uppercase tracking-[0.15em]">Total Amount</span>
            <span className="text-xl sm:text-2xl tracking-wide">
              ₹{order.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Next Steps / CTA */}
        <div className="mt-8 pt-6 border-t border-[#F5F0F7] text-center space-y-4">
          <p className="text-xs text-[#6E6472]">
            A confirmation dispatch SMS with tracking details will be sent to <strong>{order.userDetails.phone}</strong>.
          </p>
          <Link
            href="/"
            className="btn-luxury-primary w-full inline-flex items-center justify-center gap-2"
          >
            <span>Continue Exploring The Atelier</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;

