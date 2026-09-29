'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { productType } from "@/type";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`);
        setProducts(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-40">Loading...</div>;


  return (
    <div className="lg:p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Product List</h1>
      <ProductTable products={products} setProducts={setProducts} />
    </div>
  );
}
