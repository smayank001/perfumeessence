'use client';

import { useCart } from '@/hooks/useCart';
import { trackEvent } from '@/lib/metaEvent';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiTrash2, FiShoppingBag, FiTruck, FiShield, FiClock } from 'react-icons/fi';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } = useCart();

  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;

  const handleCheckout = () => {
    trackEvent('InitiateCheckout', {
      content_ids: cart.map((item) => item.productId),
      num_items: cart.reduce((total, item) => total + item.quantity, 0),
      value: totalPrice,
      currency: 'INR',
    });
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-[85vh] flex flex-col items-center justify-center px-4 font-serif select-none pt-28 pb-20">
        <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-10 sm:p-16 max-w-lg w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-[#F5F0F7] border border-[#D8CEDA] flex items-center justify-center mx-auto mb-6 text-[#A58AB8]">
            <FiShoppingBag size={28} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] block mb-2 font-normal">
            ATELIER SHOPPING BAG
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal text-[#21132F] mb-3">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6472] max-w-xs mx-auto mb-8 font-normal leading-relaxed">
            Discover our haute parfumerie formulations, nocturnal extraits, and fine jewelry pieces.
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
      <div className="mb-10 pb-6 border-b border-[#D8CEDA]">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C8A45D] font-normal block mb-1">
          ATELIER SELECTIONS
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#21132F] font-normal tracking-tight">
          Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6472] mt-1 font-normal">
          Review your chosen fragrances, timepieces, and accessories before checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* CART ITEMS (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Free Shipping Progress */}
          <div className="bg-[#FFFFFF] p-5 border border-[#D8CEDA] shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[#6E6472]">
              {remaining > 0 ? (
                <span>
                  Add <strong className="text-[#21132F] font-medium">₹{remaining.toLocaleString()}</strong> for complimentary shipping
                </span>
              ) : (
                <span className="text-[#21132F] font-medium flex items-center gap-2">
                  <FiTruck className="text-[#C8A45D] w-4 h-4" />
                  Complimentary Pan-India Shipping Unlocked
                </span>
              )}
            </div>
            <div className="relative h-1.5 w-full bg-[#F5F0F7] mt-3 border border-[#D8CEDA]/60">
              <div
                className="absolute top-0 left-0 h-full bg-[#C8A45D] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div
                key={item.productId + (item.variant?.label || '') + i}
                className="flex flex-col sm:flex-row gap-5 p-5 bg-[#FFFFFF] border border-[#D8CEDA] transition-all hover:border-[#C8A45D] shadow-sm"
              >
                {/* Image */}
                <div className="w-full sm:w-28 h-36 sm:h-32 bg-[#F5F0F7] relative flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image || '/Images/logo.png'}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base sm:text-lg text-[#21132F] font-normal leading-snug tracking-wide">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variant?.label)}
                        className="text-[#A58AB8] hover:text-[#21132F] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    {item.variant?.label && (
                      <span className="text-xs text-[#68447F] tracking-wide block mt-1">
                        Edition / Volume: {item.variant.label}
                      </span>
                    )}

                    <p className="text-sm font-normal text-[#21132F] mt-2 tracking-wider">
                      ₹{item.finalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity & Subtotal Row */}
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#F5F0F7]">
                    <div className="inline-flex items-center border border-[#D8CEDA] bg-[#F7F2E8]">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variant?.label, 'decrement')}
                        className="px-3 py-1 text-xs text-[#6E6472] hover:text-[#21132F] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-sans text-[#21132F] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variant?.label, 'increment')}
                        className="px-3 py-1 text-xs text-[#6E6472] hover:text-[#21132F] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-base font-normal text-[#21132F] tracking-wide">
                      ₹{(item.finalPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs uppercase tracking-[0.18em] text-[#6E6472] hover:text-[#21132F] transition-colors cursor-pointer underline underline-offset-4"
            >
              Clear Entire Bag
            </button>
            <Link
              href="/collections/all"
              className="text-xs uppercase tracking-[0.18em] text-[#21132F] hover:text-[#C8A45D] transition-colors luxury-link"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* ORDER SUMMARY (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#D8CEDA] p-6 sm:p-8 shadow-sm space-y-6 sticky top-32">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#68447F] block mb-1">
              SUMMARY
            </span>
            <h2 className="text-2xl font-normal text-[#21132F] tracking-wide">
              Order Details
            </h2>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-[#6E6472] border-t border-b border-[#F5F0F7] py-5">
            <div className="flex justify-between items-center">
              <span>Item Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
              <span className="text-[#21132F] font-normal">₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Express Insured Shipping</span>
              <span className="text-[#21132F]">
                {totalPrice >= FREE_SHIPPING_THRESHOLD ? (
                  <strong className="text-[#C8A45D] font-normal uppercase tracking-wider text-xs">Complimentary</strong>
                ) : (
                  '₹300'
                )}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#A58AB8]">
              <span>Taxes</span>
              <span>Included</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base uppercase tracking-[0.15em] text-[#21132F]">Estimated Total</span>
            <span className="text-2xl sm:text-3xl font-normal text-[#21132F] tracking-wide">
              ₹{(totalPrice + (totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 300)).toLocaleString()}
            </span>
          </div>

          <Link
            onClick={handleCheckout}
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all text-center cursor-pointer shadow-sm"
          >
            <span>Proceed to Checkout</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>

          {/* Luxury Guarantees */}
          <div className="pt-4 border-t border-[#F5F0F7] space-y-3 text-xs text-[#6E6472]">
            <div className="flex items-center gap-3">
              <FiShield className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>100% Authentic Handcrafted Formulations</span>
            </div>
            <div className="flex items-center gap-3">
              <FiTruck className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>Pan-India Insured Express Delivery (2–4 Days)</span>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-[#C8A45D] w-4 h-4 flex-shrink-0" />
              <span>Cash on Delivery (COD) Available Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;

