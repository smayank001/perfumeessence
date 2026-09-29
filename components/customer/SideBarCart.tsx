"use client";
import React from 'react';
import { ShoppingBag, X, Truck, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { serif } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/metaEvent';

const SideBarCart = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const { cart, removeFromCart, totalPrice, updateQuantity } = useCart()
  
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;

  const handleCheckout = () => {
      trackEvent("InitiateCheckout", {
        content_ids: cart.map((item) => item.productId),
        num_items: cart.reduce((total, item) => total + item.quantity, 0),
        value: totalPrice,
        currency: "INR",
      });

    };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)} 
      />

      {/* Sidebar Panel */}
      <aside className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#fffdfa] shadow-2xl z-[101] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header & Progress Bar */}
        <div className="p-6 border-b border-stone-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`${serif.className} text-2xl text-zinc-900 flex items-center gap-2`}>
              Your Selection <span className="text-sm font-sans font-light text-stone-400">({cart.length})</span>
            </h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X size={20} className="text-stone-500" />
            </button>
          </div>

          {/* Shipping Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-[12px] uppercase tracking-widest text-stone-500">
              {remaining > 0 ? (
                <span>Add <b className="text-zinc-900">INR {remaining.toLocaleString()}</b> for Free Shipping</span>
              ) : (
                <span className="text-emerald-700 font-bold">You've unlocked free luxury shipping!</span>
              )}
            </div>
            
            <div className="relative h-[2px] w-full bg-stone-200 mt-6">
              {/* The "Car" (Truck Icon) */}
              <div 
                className="absolute -top-4 transition-all duration-700 ease-out"
                style={{ left: `calc(${progress}% - 20px)` }}
              >
                <Truck size={18} className={`${progress === 100 ? 'text-ctr' : 'text-zinc-800'}`} />
              </div>
              {/* Progress Fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-ctr transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="overflow-y-auto h-[calc(100vh-350px)] p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40 space-y-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="tracking-widest uppercase text-xs">Your bag is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={item.productId + i} className="flex gap-4 group">
                <div className="w-24 h-24 bg-stone-50 flex-shrink-0">
                  <Image width={100} height={100} src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-[14px] font-medium text-zinc-900 leading-tight">{item.name} - <span className="text-[12px] font-normal text-zinc-600">{item.variant.label}</span></h4>
                      <button onClick={() => removeFromCart(item.productId, item.variant.label)} className="cursor-pointer">
                        <Trash2 size={14} className="text-stone-400 text-rose-900" />
                      </button>
                    </div>
                    <p className="text-[12px] text-stone-500 mt-1">INR {item.onSale ? item.salePrice?.toLocaleString() : item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.productId, item.variant.label, "decrement")} className="text-stone-400 hover:text-zinc-900 border border-stone-200 px-2 leading-none">-</button>
                    <span className="text-xs">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.variant.label, "increment")} className="text-stone-400 hover:text-zinc-900 border border-stone-200 px-2 leading-none">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-stone-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="uppercase text-[11px] tracking-[0.2em] text-stone-500">Subtotal</span>
            <span className="text-xl font-light text-zinc-900">INR {totalPrice.toLocaleString()}</span>
          </div>
          <Link onClick={handleCheckout} href="/checkout" className="w-full block text-center bg-zinc-900 text-white py-4 text-[12px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-[0.98]">
            Proceed to Checkout
          </Link>
          <div className='flex gap-2 items-center mt-2'>
            <button 
            onClick={() => setIsOpen(false)}
            className="w-full text-center pb-1 text-[10px] uppercase tracking-widest text-stone-600 hover:text-zinc-900 transition-colors"
          >
            Continue Shopping
          </button>
          <Link 
          href="/cart"
            onClick={() => setIsOpen(false)}
            className="w-full border-b border-zinc-400 pb-1 text-center text-[10px] uppercase tracking-widest text-stone-600 hover:text-zinc-900 transition-colors"
          >
            Cart
          </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarCart;