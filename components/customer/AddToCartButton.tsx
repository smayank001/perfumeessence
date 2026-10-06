'use client';

import { useCart } from '@/hooks/useCart';
import { trackEvent } from '@/lib/metaEvent';
import { productType } from '@/type';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const AddToCartButton = ({ product }: { product: productType }) => {
  const { addToCart, cart } = useCart();
  const hasVariants = product.hasVariants && product.variants?.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<{
    label: string;
    stock: number;
  } | null>(product.hasVariants && product.variants?.[0] ? { label: product.variants[0].label, stock: product.variants[0].stock } : null);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [showError, setShowError] = useState(false);

  const getDynamicPrice = (label?: string | null) => {
    if (label?.includes('100')) return 1499;
    if (label?.includes('50')) return 799;
    return product.onSale && product.salePrice ? product.salePrice : product.price;
  };

  const finalPrice = getDynamicPrice(selectedVariant?.label);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (hasVariants && !selectedVariant) {
      setShowError(true);
      return;
    }

    const target = product.hasVariants ? selectedVariant : product.variants[0];
    const currentInCart = cart.find(
      item => item.productId === product._id && item.variant?.label === target?.label
    );
    const totalProposedQuantity = (currentInCart?.quantity || 0) + quantity;
    const stockLimit = target?.stock ?? 999;

    if (totalProposedQuantity > stockLimit) {
      alert(`Only ${stockLimit} items available. You already have ${currentInCart?.quantity || 0} in bag.`);
      return;
    }

    const variantPrice = getDynamicPrice(target?.label);

    setLoading(true);

    if (!target) {
      return;
    }

    trackEvent("AddToCart", {
      content_ids: [product._id],
      content_name: product.name,
      content_type: "product",
      value: variantPrice,
      currency: "INR",
      quantity,
    });
    
    setTimeout(() => {
      addToCart({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        variant: { label: target?.label, stock: target?.stock },
        price: variantPrice,
        salePrice: null,
        onSale: false,
        finalPrice: variantPrice,
        quantity,
      });

      setLoading(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6 font-serif select-none">
      {/* ERROR MODAL */}
      {showError && (
        <div className="fixed inset-0 bg-[#19151D]/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-[#FFFFFF] border border-[#D8CEDA] p-8 sm:p-10 relative max-w-sm w-full text-center shadow-2xl">
            <button
              onClick={() => setShowError(false)}
              className="absolute top-4 right-4 text-[#A58AB8] hover:text-[#21132F] transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A45D] block mb-2">
              Selection Required
            </span>
            <h2 className="text-xl font-normal tracking-wide text-[#21132F] mb-3">
              Please Select a Variant
            </h2>
            <p className="text-[#6E6472] text-xs mb-6 font-normal leading-relaxed">
              Kindly choose your preferred flacon volume or edition to proceed.
            </p>
            <button 
              onClick={() => setShowError(false)}
              className="w-full py-3 bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] text-[10px] uppercase tracking-[0.2em] hover:bg-[#C8A45D] hover:text-[#19151D] transition-colors cursor-pointer shadow-sm"
            >
              Continue Selection
            </button>
          </div>
        </div>
      )}

      {/* VARIANT SELECTION */}
      {hasVariants && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-normal text-[#68447F]">
              Select Edition / Volume
            </h3>
            {selectedVariant && (
              <span className="text-xs text-[#6E6472] tracking-wider">
                {selectedVariant.label}
              </span>
            )}
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.label}
                disabled={v.stock <= 0}
                onClick={() => {
                  setSelectedVariant({ label: v.label, stock: v.stock });
                  setShowError(false);
                }}
                className={`min-w-[90px] py-2.5 px-4 border text-[11px] tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer
                  ${selectedVariant?.label === v.label 
                    ? 'border-[#21132F] bg-[#21132F] text-[#F7F2E8] shadow-sm' 
                    : 'border-[#D8CEDA] bg-[#FFFFFF] text-[#6E6472] hover:border-[#21132F] hover:text-[#21132F]'}
                  ${v.stock <= 0 ? 'opacity-30 cursor-not-allowed border-dashed' : ''}
                `}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          {/* Quantity Toggle */}
          <div className="flex items-center border border-[#D8CEDA] bg-[#FFFFFF] h-13 px-1">
            <button
              className="px-3 py-2 text-[#6E6472] hover:text-[#21132F] transition-colors cursor-pointer text-sm"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-serif text-[#21152F] tabular-nums">
              {quantity}
            </span>
            <button
              className="px-3 py-2 text-[#6E6472] hover:text-[#21132F] transition-colors cursor-pointer text-sm"
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          {/* Main Add Button */}
          <button
            onClick={() => handleAddToCart()}
            disabled={loading || added}
            className={`flex-1 h-13 text-[11px] uppercase tracking-[0.22em] font-normal transition-all duration-300 relative border cursor-pointer shadow-sm
              ${added 
                ? 'bg-[#68447F] text-[#F7F2E8] border-[#C8A45D]' 
                : 'bg-[#21132F] text-[#F7F2E8] border-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D]'
              }
            `}
          >
            <span className={loading ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-2'}>
              {added ? (
                <>
                  <FiCheck className="w-4 h-4 text-[#DCC7A3]" />
                  <span>Added to Selection</span>
                </>
              ) : (
                'Add to Bag'
              )}
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#DCC7A3]/30 border-t-[#DCC7A3] rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

        {/* Express Checkout */}
        <Link
          href="/checkout"
          onClick={() => {
            handleAddToCart();
            if (!added) {
              trackEvent("InitiateCheckout", {
                content_ids: cart.map((item) => item.productId),
                num_items: cart.reduce((total, item) => total + item.quantity, 0),
                value: finalPrice,
                currency: "INR",
                quantity,
              });
              setTimeout(() => window.location.href = "/checkout", 700);
            }
          }}
          className="block w-full text-center py-3.5 border border-[#21132F] text-[#21132F] bg-transparent text-[11px] uppercase tracking-[0.22em] hover:bg-[#21132F] hover:text-[#F7F2E8] transition-all duration-300 shadow-sm"
        >
          Express Checkout
        </Link>
      </div>
    </div>
  );
};

export default AddToCartButton;