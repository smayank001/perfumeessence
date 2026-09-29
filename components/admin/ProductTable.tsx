'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';
import { productType } from '@/type';

interface ProductTableProps {
  products: productType[];
  setProducts: React.Dispatch<React.SetStateAction<productType[]>>
}

export default function ProductTable({ products, setProducts }: ProductTableProps) {


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);
      if (res.status === 200) alert("Product deleted successfully!");
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const [loadingId, setLoadingId] = React.useState<string | null>(null);

 const changeHotSellerValue = async (
  id: string,
  hotSeller: boolean
) => {
  try {
    setLoadingId(id);

    await axios.patch(`/api/products/${id}/hot-seller`, {
      hotSeller,
    });

    setProducts(prev =>
      prev.map(product =>
        product._id === id
          ? { ...product, hotSeller }
          : product
      )
    );
  } catch (err) {
    console.log(err);
    alert("Failed to update.");
  } finally {
    setLoadingId(null);
  }
};

  const columns: GridColDef<any>[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        params.row.images && params.row.images.length > 0 ? (
          <img
            src={params.row.images[0]}
            alt={params.row.name}
            style={{ width: 60, height: 60, objectFit: 'cover' }}
          />
        ) : <span>No Image</span>
      ),
    },
    { field: 'hotSeller', headerName: 'Hot Seller', minWidth: 70, renderCell: (params) =>
  loadingId === params.row._id ? (
    <div className="w-3 h-3 rounded-full border border-black border-t-transparent animate-spin" />
  ) : (
    <input
      type="checkbox"
      className="cursor-pointer"
      checked={params.row.hotSeller ?? false}
      onChange={() =>
        changeHotSellerValue(params.row._id, !params.row.hotSeller)
      }
    />
  )
     },
    { field: 'name', headerName: 'Product Name', minWidth: 190 },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
    },

    {
      field: 'salePrice',
      headerName: 'Sale Price',
      width: 120,
    },
   {
      field: 'onSale',
      headerName: 'On Sale',
      width: 120,
      type: "boolean"
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 220,
      renderCell: (params) => {
        return params.row.variants.map((v: any) => v.label !== "default" ? (v.label + ": " + v.stock) : " " + v.stock).join(", ");
      }
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 180,
    },
    {
      field: 'variants',
      headerName: 'Variants',
      width: 200,
      renderCell: (params) => {
        if (!params.row.hasVariants) return "No Variants";
        return params.row.variants.map((v: any) => v.label).join(", ");
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <Link href={`/admin-dashboard/update-product/${params.row._id}`}><Edit /></Link>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <Trash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 1, borderRadius: 2 }}>
      <DataGrid
        rows={products as productType[]}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
