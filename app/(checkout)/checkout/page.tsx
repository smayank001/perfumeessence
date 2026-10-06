'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { NEXT_PUBLIC_BASE_URL } from '@/config';
import { FiShield, FiTruck, FiLock, FiCheckCircle, FiUpload, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const FREE_SHIPPING_THRESHOLD = 5000;
  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 300;
  const finalTotal = totalPrice + shippingCost;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setStatus('Your cart is empty.');
      return;
    }

    setStatus('Processing your order...');
    setLoading(true);

    const orderData = {
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        onSale: item.onSale,
        salePrice: item.salePrice,
        finalPrice: item.finalPrice,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant?.label || '',
      })),
      totalPrice: finalTotal,
      shippingCost: shippingCost,
      userDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || 'No email',
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode || 'N/A',
      },
      notes: formData.notes || 'No notes',
      paymentMethod: formData.paymentMethod,
    };

    const payload = new FormData();
    payload.append('orderData', JSON.stringify(orderData));
    if (paymentProof) payload.append('paymentProof', paymentProof);

    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/order`,
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setStatus('Order placed successfully!');
      clearCart();
      router.push(`/thank-you/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main className="min-h-[85vh] flex flex-col items-center justify-center px-4 font-serif select-none pt-28 pb-20">
        <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-10 sm:p-14 max-w-lg w-full text-center shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] block mb-2 font-normal">
            ATELIER CHECKOUT
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal text-[#21132F] mb-3">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6472] max-w-xs mx-auto mb-8 font-normal leading-relaxed">
            Please add items to your shopping bag before proceeding to checkout.
          </p>
          <Link
            href="/collections/perfumes"
            className="btn-luxury-primary w-full inline-flex items-center justify-center gap-2"
          >
            <span>Explore Fragrances</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto font-serif select-none">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-[#D8CEDA] text-center md:text-left">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-1">
          SECURE ATELIER CHECKOUT
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6472] mt-1 font-normal">
          Pan-India express delivery with discreet, insured velvet gift packaging.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT: SHIPPING & BILLING FORM (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#D8CEDA] p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Patron Contact */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F5F0F7]">
                <span className="w-5 h-5 rounded-full bg-[#21132F] text-[#F7F2E8] text-[10px] flex items-center justify-center">1</span>
                <h2 className="text-lg font-normal text-[#21132F] tracking-wide">
                  Patron Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="e.g. Vikramaditya Roy"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                    Phone Number (+91) *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                    Email Address (For Order Tracking)
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="e.g. patron@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Destination */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F5F0F7]">
                <span className="w-5 h-5 rounded-full bg-[#21132F] text-[#F7F2E8] text-[10px] flex items-center justify-center">2</span>
                <h2 className="text-lg font-normal text-[#21132F] tracking-wide">
                  Delivery Destination
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                    Complete Street Address *
                  </label>
                  <input
                    name="address"
                    placeholder="House / Apartment / Street Name"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                      City / State *
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="e.g. Mumbai, Maharashtra"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                      Postal PIN Code
                    </label>
                    <input
                      name="postalCode"
                      type="text"
                      placeholder="6-digit PIN"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5">
                    Special Atelier / Delivery Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Gift message or discrete delivery instructions..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F5F0F7]">
                <span className="w-5 h-5 rounded-full bg-[#21132F] text-[#F7F2E8] text-[10px] flex items-center justify-center">3</span>
                <h2 className="text-lg font-normal text-[#21132F] tracking-wide">
                  Payment Preference
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#21132F] bg-[#F5F0F7]'
                      : 'border-[#D8CEDA] bg-[#FFFFFF] hover:border-[#A58AB8]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mt-1 accent-[#21132F]"
                  />
                  <div>
                    <span className="text-sm font-medium text-[#21132F] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-[#6E6472] mt-0.5 block">
                      Pay securely upon doorstep delivery across India.
                    </span>
                  </div>
                </label>

                <label
                  className={`p-4 border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'bank'
                      ? 'border-[#21132F] bg-[#F5F0F7]'
                      : 'border-[#D8CEDA] bg-[#FFFFFF] hover:border-[#A58AB8]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleChange}
                    className="mt-1 accent-[#21132F]"
                  />
                  <div>
                    <span className="text-sm font-medium text-[#21132F] block">
                      Online / UPI Transfer
                    </span>
                    <span className="text-[11px] text-[#6E6472] mt-0.5 block">
                      Transfer via UPI or Net Banking with verification proof.
                    </span>
                  </div>
                </label>
              </div>

              {/* Bank Transfer Instructions */}
              {formData.paymentMethod === 'bank' && (
                <div className="mt-4 p-5 bg-[#F5F0F7] border border-[#D8CEDA] space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#68447F] font-medium">
                    <FiShield className="text-[#C8A45D]" />
                    <span>Online Transfer Information</span>
                  </div>
                  <p className="text-xs text-[#6E6472] leading-relaxed">
                    Direct bank and UPI payment details will be coordinated with our concierge upon order placement. Please upload your transfer screenshot below if already executed.
                  </p>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#21132F] mb-1.5 font-medium">
                      Upload Payment Receipt (Image)
                    </label>
                    <div className="relative border border-dashed border-[#D8CEDA] bg-[#FFFFFF] p-4 text-center hover:border-[#21132F] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                        <FiUpload className="text-[#68447F] w-5 h-5" />
                        <span className="text-xs text-[#6E6472]">Click or drag to attach receipt</span>
                      </div>
                    </div>
                    {preview && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="w-16 h-16 relative border border-[#D8CEDA] overflow-hidden">
                          <Image src={preview} alt="Payment proof preview" fill className="object-cover" />
                        </div>
                        <span className="text-xs text-[#21132F] flex items-center gap-1">
                          <FiCheckCircle className="text-[#C8A45D]" /> Receipt attached
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#F5F0F7]">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Securing Order...' : 'Place Order Now'}</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              {status && (
                <p className="mt-4 text-center text-xs text-[#68447F] font-normal tracking-wide">
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#D8CEDA] p-6 sm:p-8 shadow-sm space-y-6 sticky top-32">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#68447F] block mb-1">
              REVIEW
            </span>
            <h2 className="text-2xl font-normal text-[#21132F] tracking-wide">
              Your Order ({cart.length})
            </h2>
          </div>

          {/* Items Preview */}
          <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1 border-t border-b border-[#F5F0F7] py-4">
            {cart.map((item, i) => (
              <div key={i} className="flex gap-3.5 items-center">
                <div className="w-14 h-16 bg-[#F5F0F7] relative flex-shrink-0 border border-[#D8CEDA] overflow-hidden">
                  <Image
                    src={item.image || '/Images/logo.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-normal text-[#21132F] truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#6E6472]">
                    Qty: {item.quantity} {item.variant?.label && item.variant.label !== 'default' ? `• ${item.variant.label}` : ''}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-normal text-[#21132F]">
                  ₹{(item.finalPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2.5 text-xs sm:text-sm text-[#6E6472]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#21132F]">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Express Insured Shipping</span>
              <span className="text-[#21132F]">
                {shippingCost === 0 ? (
                  <strong className="text-[#C8A45D] font-normal uppercase tracking-wider text-xs">Complimentary</strong>
                ) : (
                  `₹${shippingCost}`
                )}
              </span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="pt-4 border-t border-[#D8CEDA] flex justify-between items-center">
            <span className="text-base uppercase tracking-[0.15em] text-[#21132F]">Grand Total</span>
            <span className="text-2xl sm:text-3xl font-normal text-[#21132F] tracking-wide">
              ₹{finalTotal.toLocaleString()}
            </span>
          </div>

          {/* Trust Assurances */}
          <div className="pt-4 border-t border-[#F5F0F7] space-y-3 text-xs text-[#6E6472]">
            <div className="flex items-center gap-3">
              <FiLock className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <FiTruck className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>Delivered via Premium Express Courier Partners</span>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>100% Quality & Authenticity Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;

