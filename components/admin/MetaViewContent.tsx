"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/metaEvent";

type MetaViewContentProps = {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
};

export default function MetaViewContent({
  productId,
  name,
  price,
  salePrice,
  onSale,
}: MetaViewContentProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    trackEvent("ViewContent", {
      content_ids: [productId],
      content_name: name,
      content_type: "product",
      value: onSale && salePrice ? salePrice : price,
      currency: "INR",
    });
  }, [productId, name, price, salePrice, onSale]);

  return null;
}