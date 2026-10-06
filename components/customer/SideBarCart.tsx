"use client";

import React from 'react';
import { ShoppingBag, X, Truck, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/metaEvent';

const SideBarCart = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const { cart, removeFromCart, totalPrice, updateQuantity } = useCart();

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
        className={`fixed inset-0 bg-[#19151D]/70 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)} 
      />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#F7F2E8] text-[#19151D] shadow-2xl z-[101] border-l border-[#D8CEDA] flex flex-col justify-between transition-transform duration-500 ease-in-out font-serif select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header & Shipping Progress */}
        <div className="p-6 bg-[#FFFFFF] border-b border-[#D8CEDA]">
          <div className="flex justify-between items-center mb-5">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#68447F]">
                Shopping Bag
              </span>
              <h2 className="text-xl sm:text-2xl text-[#21132F] tracking-wide font-normal">
                Your Selection <span className="text-sm font-normal text-[#A58AB8]">({cart.length})</span>
              </h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-[#A58AB8] hover:text-[#21132F] hover:bg-[#F5F0F7] transition-colors rounded-none cursor-pointer"
              aria-label="Close Bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F5F0F7] p-4 border border-[#D8CEDA]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#6E6472]">
              {remaining > 0 ? (
                <span>
                  Add <strong className="text-[#21132F]">₹{remaining.toLocaleString()}</strong> for complimentary shipping
                </span>
              ) : (
                <span className="text-[#21132F] font-semibold flex items-center gap-1.5">
                  <Truck size={14} className="text-[#C8A45D]" />
                  Complimentary Shipping Unlocked
                </span>
              )}
            </div>
            
            <div className="relative h-1.5 w-full bg-[#D8CEDA] mt-3">
              <div 
                className="absolute top-0 left-0 h-full bg-[#C8A45D] transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 opacity-60 space-y-3">
              <ShoppingBag size={42} strokeWidth={1} className="text-[#A58AB8]" />
              <p className="tracking-[0.2em] uppercase text-xs text-[#21132F]">Your bag is currently empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[0.16em] text-[#C8A45D] underline underline-offset-4 hover:text-[#21132F] transition-colors cursor-pointer"
              >
                Discover Moon Essence
              </button>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={item.productId + (item.variant?.label || '') + i} className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#D8CEDA] transition-all hover:border-[#C8A45D]">
                <div className="w-20 h-24 bg-[#F5F0F7] flex-shrink-0 relative overflow-hidden">
                  <Image 
                    width={100} 
                    height={120} 
                    src={item.image || '/Images/logo.png'} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-normal text-[#21132F] leading-snug tracking-wide">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.productId, item.variant.label)} 
                        className="text-[#A58AB8] hover:text-[#21132F] transition-colors ml-2 cursor-pointer p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {item.variant?.label && (
                      <span className="text-[11px] text-[#6E6472] tracking-wide block mt-0.5">
                        {item.variant.label}
                      </span>
                    )}
                    <p className="text-xs font-normal text-[#21132F] mt-1 tracking-wider">
                      ₹{item.onSale && item.salePrice ? item.salePrice.toLocaleString() : item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="inline-flex items-center border border-[#D8CEDA] bg-[#F7F2E8]">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variant.label, "decrement")} 
                        className="px-2.5 py-0.5 text-xs text-[#6E6472] hover:text-[#21132F] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-sans text-[#21132F] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.variant.label, "increment")} 
                        className="px-2.5 py-0.5 text-xs text-[#6E6472] hover:text-[#21132F] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout Actions */}
        <div className="p-6 bg-[#FFFFFF] border-t border-[#D8CEDA] space-y-4">
          <div className="flex justify-between items-center">
            <span className="uppercase text-[10px] tracking-[0.25em] text-[#68447F]">Estimated Subtotal</span>
            <span className="text-xl font-normal text-[#21152F] tracking-wider">₹{totalPrice.toLocaleString()}</span>
          </div>
          
          <p className="text-[10px] tracking-[0.1em] text-[#A58AB8] text-center">
            Taxes included • Insured express delivery calculated at checkout
          </p>

          <Link 
            onClick={() => {
              handleCheckout();
              setIsOpen(false);
            }} 
            href="/checkout" 
            className="w-full flex items-center justify-center gap-2 bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all text-center cursor-pointer shadow-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={14} />
          </Link>

          <div className="flex gap-3 items-center pt-1">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-1/2 text-center py-2 text-[10px] uppercase tracking-[0.18em] text-[#6E6472] hover:text-[#21132F] border border-[#D8CEDA] hover:bg-[#F7F2E8] transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
            <Link 
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="w-1/2 text-center py-2 text-[10px] uppercase tracking-[0.18em] text-[#21132F] hover:text-[#21132F] border border-[#D8CEDA] bg-[#F7F2E8] hover:bg-[#EFE7DA] transition-colors"
            >
              Full Bag View
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarCart;