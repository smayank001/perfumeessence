"use client";

import OrderTable from "@/components/admin/OrderTable";
import { Order } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_BASE_URL } from "@/config";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${NEXT_PUBLIC_BASE_URL || ''}/api/order`
        );
        setOrders(Array.isArray(res.data?.orders) ? res.data.orders : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <main className="text-center py-10">Loading orders...</main>;

  return (
    <main className="lg:p-5">
      <h1 className="text-2xl text-center font-semibold mb-4">Orders</h1>
      <OrderTable orders={orders} />
    </main>
  );
}
