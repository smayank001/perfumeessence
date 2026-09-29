'use client';

import { categories } from '@/lib/constants';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import imageCompression from "browser-image-compression";

type VariantInput = {
  label: string;
  stock: string;
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {

  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    slug: '',
    category: 'watches',
    description: '',
    keywords: [] as string[],
    fragranceType: '',
    hasVariants: false,
    price: '',
    salePrice: '',
    onSale: false,
  });
  console.log(data)

  const [variants, setVariants] = useState<VariantInput[]>([{ label: '', stock: '' }]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  /* ---------------- FETCH PRODUCT ---------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data.data;

        setData({
          name: product.name,
          slug: product.slug,
          category: product.category,
          description: product.description,
          keywords: product.keywords || [],
          fragranceType: product.fragranceType || '',
          hasVariants: product.hasVariants || false,
          price: String(product.price),
          salePrice: product.salePrice ? String(product.salePrice) : '',
          onSale: product.onSale || false,
        });

        setVariants(
          product.variants?.map((v: any) => ({
            label: v.label,
            stock: String(v.stock),
          })) || [{ label: '', stock: '' }]
        );

        setExistingImages(product.images || []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* ---------------- SLUG ---------------- */

  const toSlug = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const productSlug = useMemo(() => toSlug(data.name), [data.name]);

  useEffect(() => {
    setData(prev => ({ ...prev, slug: productSlug }));
  }, [productSlug]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleVariantChange = (
    index: number,
    field: keyof VariantInput,
    value: string
  ) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () =>
    setVariants(prev => [...prev, { label: '', stock: '' }]);

  const removeVariant = (index: number) =>
    setVariants(prev => prev.filter((_, i) => i !== index));

  /* ---------------- IMAGES ---------------- */

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
    setPreviews(prev => [...prev, ...selected.map(f => URL.createObjectURL(f))]);
  };

  const handleDeleteExistingImage = async (imgUrl: string) => {
    const { id } = await params;

    setExistingImages(prev => prev.filter(i => i !== imgUrl));

    await axios.patch(`/api/products/${id}`, {
      action: "deleteImage",
      imageUrl: imgUrl,
    });
  };

  /* ---------------- KEYWORDS ---------------- */

  const [keywordsInput, setKeywordsInput] = useState('');

  const handleKeywords = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setKeywordsInput(raw);

    setData(prev => ({
      ...prev,
      keywords: raw.split(',').map(k => k.trim()).filter(Boolean)
    }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { id } = await params;

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("fragranceType", data.fragranceType);
      formData.append("price", data.price);
      formData.append("salePrice", data.salePrice);
      formData.append("onSale", String(data.onSale));
      formData.append("hasVariants", String(data.hasVariants));

      data.keywords.forEach(k =>
        formData.append("keywords", JSON.stringify(k))
      );

      variants.forEach(v =>
        formData.append("variants", JSON.stringify(v))
      );

      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

        formData.append("images", compressed);
      }

      const res = await axios.patch(`/api/products/${id}`, formData);

      if (res.status === 200) {
        setResult("✅ Product updated");
        setTimeout(() => router.push("/admin-dashboard/products-list"), 1500);
      }

    } catch (err) {
      console.error(err);
      setResult("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
  <main className="p-6 bg-gray-100 max-w-6xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-6"
    >
      <h1 className="text-3xl font-bold text-center">Update Product</h1>

      {/* PRODUCT NAME */}
      <div>
        <label className="label">Product Name</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          className="input"
          placeholder="e.g. Rolex Submariner"
        />
      </div>

      {/* PRICE */}
      <div>
        <label className="label">Price (INR)</label>
        <input
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* SALE */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="onSale"
          checked={data.onSale}
          onChange={handleChange}
        />
        <label className="font-medium">On Sale</label>
      </div>

      {data.onSale && (
        <div>
          <label className="label">Sale Price (INR)</label>
          <input
            name="salePrice"
            type="number"
            value={data.salePrice}
            onChange={handleChange}
            className="input"
          />
        </div>
      )}

      {/* CATEGORY */}
      <div>
        <label className="label">Category</label>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="input"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="input h-28"
          placeholder="Product details..."
        />
      </div>

      {/* KEYWORDS */}
      <div>
        <label className="label">
          Keywords <span className="text-sm text-gray-500">(comma separated)</span>
        </label>
        <input
          value={data.keywords.join(", ")}
          onChange={handleKeywords}
          className="input"
          placeholder="watch, luxury, stainless steel"
        />
      </div>

      {/* PERFUME ONLY */}
      {data.category.includes("perfumes") && (
        <div>
          <label className="label">Fragrance Type</label>
          <input
            name="fragranceType"
            value={data.fragranceType}
            onChange={handleChange}
            className="input"
            placeholder="e.g. Eau de Parfum"
          />
        </div>
      )}

      {/* RING VARIANTS */}
      {(
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.hasVariants}
              onChange={e =>
                setData(prev => ({ ...prev, hasVariants: e.target.checked }))
              }
            />
            <label className="font-medium">This product has variants</label>
          </div>

          { (
            <>
              <h2 className="text-lg font-semibold">Variants</h2>

              {variants.map((v, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div>
                    <label className="label">Variant Label</label>
                    <input
                      value={v.label}
                      onChange={e =>
                        handleVariantChange(i, "label", e.target.value)
                      }
                      className="input"
                      placeholder="e.g. Size 7"
                    />
                  </div>

                  <div>
                    <label className="label">Stock</label>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={e =>
                        handleVariantChange(i, "stock", e.target.value)
                      }
                      className="input"
                    />
                  </div>

                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="text-red-500 text-sm"
                    >
                      Remove Variant
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addVariant}
                className="text-blue-600 text-sm"
              >
                + Add Variant
              </button>
            </>
          )}
        </div>
      )}

      {/* EXISTING IMAGES */}
      <div>
        <label className="label">Existing Images</label>
        <div className="flex gap-3 flex-wrap mt-2">
          {existingImages.map((img, i) => (
            <div key={i} className="relative">
              <Image src={img} width={80} height={80} alt="" className="rounded" />
              <button
                type="button"
                onClick={() => handleDeleteExistingImage(img)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD IMAGES */}
      <div>
        <label className="label block mb-2">Upload New Images</label>
        <input type="file" multiple onChange={handleImageChange} />
      </div>

      <div className="flex gap-3 flex-wrap">
        {previews.map((src, i) => (
          <Image key={i} src={src} width={80} height={80} alt="" />
        ))}
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>

      {result && <p className="text-center">{result}</p>}
    </form>

    <style jsx>{`
      .input {
        width: 100%;
        padding: 10px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        margin-top: 4px;
      }
      .label {
        font-weight: 600;
        font-size: 14px;
      }
    `}</style>
  </main>
);

};

export default Page;
