"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Order, OrderStatus } from "@/type";

export default function OrderTable({ orders = [] }: { orders: Order[] }) {
  const [rows, setRows] = React.useState(
    (orders || []).map((order) => ({
      id: order._id,
      orderId: (order.orderId || '').slice(0, 7),
      userName: order.userDetails?.fullName || '',
      email: order.userDetails?.email || '',
      phone: order.userDetails?.phone || '',
      totalPrice: order.totalPrice,
      status: order.status,
      paymentProof: order.paymentProof ?? "",
      createdAt: new Date(order.createdAt).toLocaleString(),
      address: order.shippingAddress?.address ?? "-",
      items: order.items,
      notes: order.notes ?? "-",
      orderType: order.paymentMethod, // COD / BANK
    }))
  );
  console.log(rows)
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  /* ---------------- DELETE ORDER ---------------- */
  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.delete(`/api/order/${id}`);
      if (res.data.success) {
        setRows((prev) => prev.filter((row) => row.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  /* ---------------- STATUS COLOR ---------------- */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#facc15";
      case "processing":
        return "#60a5fa";
      case "shipped":
        return "#34d399";
      case "delivered":
        return "#22c55e";
      case "cancelled":
        return "#f87171";
      default:
        return "#9ca3af";
    }
  };

  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 110 },

    {
      field: "items",
      headerName: "Items",
      width: 520,
      sortable: false,
      renderCell: (params) => (
        <div className="flex flex-col my-3  p-2  gap-2">
          {params.value.map((item: any, i: number) => (
            <div key={i} className="flex items-center border-b gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={40}
                height={40}
                className="rounded border object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">
                  {item.quantity} × ₹{item.price} - 
                   ({ item.variant })
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    { field: "userName", headerName: "Customer", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },

    {
      field: "orderType",
      headerName: "Payment",
      width: 120,
      valueFormatter: (v: string) => v.toUpperCase(),
    },

    {
      field: "totalPrice",
      headerName: "Total (₹)",
      width: 120,
    },

    {
    field: "status",
    headerName: "Status",
    width: 170,
    renderCell: (params) => {
      const getColor = (status: string) => {
        switch (status) {
          case "pending":
            return "#facc15";
          case "processing":
            return "#60a5fa";
          case "shipped":
            return "#34d399";
          case "delivered":
            return "#22c55e";
          case "cancelled":
            return "#f87171";
          default:
            return "#9ca3af";
        }
      };


const handleChange = async (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const newStatus = e.target.value as OrderStatus; // ✅ cast here

  try {
    const res = await axios.patch(`/api/order/${params.row.id}`, { status: newStatus });

    if (res.data.success) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === params.row.id
            ? { ...row, status: newStatus } // now TS is happy
            : row
        )
      );
    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error(error);
    alert("Error updating status");
  }
};

          

      return (
        <select
          value={params.value}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold focus:outline-none"
          style={{
            backgroundColor: getColor(params.value),
            color: "white",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      );
    },
  },
    {
      field: "paymentProof",
      headerName: "Payment Proof",
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <Link href={params.value} target="_blank">
            <Image
              src={params.value}
              alt="Payment Proof"
              width={50}
              height={50}
              className="rounded border object-cover"
            />
          </Link>
        ) : (
          <span className="text-gray-400 text-sm">No Proof</span>
        ),
    },

    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "address", headerName: "Address", width: 280 },
    { field: "notes", headerName: "Notes", width: 200 },

    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteOrder(params.row.id)}
        >
          <Trash size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowHeight={() => "auto"} 
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
