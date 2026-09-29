'use client'

import { useCart } from '@/hooks/useCart'
import { trackEvent } from '@/lib/metaEvent'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  )

  const handleCheckout = () => {
    trackEvent("InitiateCheckout", {
      content_ids: cart.map((item) => item.productId),
      num_items: cart.reduce((total, item) => total + item.quantity, 0),
      value: subtotal,
      currency: "INR",
    });
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-[90vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border border-black transition"
        >
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div
              key={item.productId + item.variant?.label}
              className="flex gap-6 border-b pb-6"
            >
              {/* IMAGE */}
              <div className="w-28 h-28 relative ">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>

                {item.variant && (
                  <p className="text-sm text-zinc-500">
                    Size: {item.variant.label}
                  </p>
                )}

                <p className="mt-2 text-sm">
                  Price:{' '}
                  <span className="font-semibold">
                    ₹{item.finalPrice}
                  </span>
                </p>

                <p className="text-sm">Qty: {item.quantity}</p>

                <button
                  onClick={() =>
                    removeFromCart(
                      item.productId,
                      item.variant?.label
                    )
                  }
                  className="text-sm text-red-500 mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* TOTAL */}
              <div className="font-semibold">
                ₹{item.finalPrice * item.quantity}
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        {/* SUMMARY */}
        <div className="border p-6 h-max sticky top-32">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <Link
            onClick={handleCheckout}
            href="/checkout"
            className="block mt-6 w-full text-center py-3 bg-black text-white hover:bg-white hover:text-black border border-black transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  )
}

export default CartPage
