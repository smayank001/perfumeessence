'use client'

import { useCart } from '@/hooks/useCart'
import { trackEvent } from '@/lib/metaEvent'
import { productType } from '@/type'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiX, FiCheck } from 'react-icons/fi'

const AddToCartButton = ({ product }: { product: productType }) => {
  const { addToCart, cart } = useCart() // Bringing in 'cart' to check existing quantities
  const hasVariants = product.hasVariants && product.variants?.length > 0
  const [selectedVariant, setSelectedVariant] = useState<{
    label: string
    stock: number
  } | null>(product.hasVariants && product.variants?.[0] ? { label: product.variants[0].label, stock: product.variants[0].stock } : null)

  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [showError, setShowError] = useState(false)

  const getDynamicPrice = (label?: string | null) => {
    if (label?.includes('100')) return 1499
    if (label?.includes('50')) return 799
    return product.onSale && product.salePrice ? product.salePrice : product.price
  }

  const finalPrice = getDynamicPrice(selectedVariant?.label)

  const handleAddToCart = (e?: React.MouseEvent) => {
    // 1. Variant selection check
    if (hasVariants && !selectedVariant) {
      setShowError(true)
      return
    }

    const target = product.hasVariants ? selectedVariant : product.variants[0]
    const currentInCart = cart.find(
      item => item.productId === product._id && item.variant?.label === target?.label
    )
    const totalProposedQuantity = (currentInCart?.quantity || 0) + quantity
    const stockLimit = target?.stock ?? 999

    if (totalProposedQuantity > stockLimit) {
      alert(`Only ${stockLimit} items available. You already have ${currentInCart?.quantity || 0} in bag.`)
      return 
    }

    const variantPrice = getDynamicPrice(target?.label)

    // 3. Success Logic
    setLoading(true)

    if(!target){
      return
    }

    trackEvent("AddToCart", {
      content_ids: [product._id],
      content_name: product.name,
      content_type: "product",
      value: variantPrice,
      currency: "INR",
      quantity,
    });
    
    // Slight delay for luxury feel
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
      })
      

      setLoading(false)
      setAdded(true)
      setTimeout(() => setAdded(false), 2500)
    }, 500)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ERROR MODAL */}
      {showError && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-white p-12 relative max-w-sm w-full text-center shadow-2xl">
            <button onClick={() => setShowError(false)} className="absolute top-4 right-4 text-stone-400">
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-light tracking-widest uppercase mb-4 text-stone-900">Select Variant</h2>
            <p className="text-stone-500 text-sm mb-6">Please select a size or style to continue.</p>
            <button 
              onClick={() => setShowError(false)}
              className="w-full py-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest"
            >
              Back to Selection
            </button>
          </div>
        </div>
      )}

      {/* VARIANT SELECTION */}
      {hasVariants && (
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900">Selection</h3>
          <div className="flex gap-3 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.label}
                disabled={v.stock <= 0}
                onClick={() => {
                  setSelectedVariant({ label: v.label, stock: v.stock })
                  setShowError(false)
                }}
                className={`min-w-[80px] py-2 px-4 border transition-all duration-300 text-[12px] tracking-widest uppercase
                  ${selectedVariant?.label === v.label 
                    ? 'border-stone-900 bg-stone-900 text-white' 
                    : 'border-stone-200 text-stone-600 hover:border-stone-900'}
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
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Quantity Toggle */}
          <div className="flex items-center border border-stone-200 h-14">
            <button className="px-4 text-stone-400" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span className="w-6 text-center text-sm">{quantity}</span>
            <button className="px-4 text-stone-400" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          
          {/* Main Add Button */}
          <button
            onClick={() => handleAddToCart()}
            disabled={loading || added}
            className={`flex-1 h-14 text-[11px] uppercase tracking-[0.3em] transition-all relative
              ${added ? 'bg-ctr text-white' : 'bg-stone-900 text-white hover:bg-stone-800'}
            `}
          >
            <span className={loading ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-2'}>
              {added ? <><FiCheck /> Added to Bag</> : 'Add to Bag'}
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

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
          className="block w-full text-center py-4 border border-stone-900 text-[11px] uppercase tracking-[0.3em] hover:bg-stone-50 transition-colors"
        >
          Express Checkout
        </Link>
      </div>
    </div>
  )
}

export default AddToCartButton