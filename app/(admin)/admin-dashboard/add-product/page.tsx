'use client'
import { categories } from '@/lib/constants'
import Image from 'next/image'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import imageCompression from "browser-image-compression";
import axios from "axios"

type VariantInput = {
  label: string
  stock: string
}

export default function AddProductUI() {
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
  })

  const [variants, setVariants] = useState<VariantInput[]>([{ label: '', stock: '' }])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const toSlug = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  const productSlug = useMemo(() => toSlug(data.name), [data.name])
  useEffect(() => {
    setData(prev => ({ ...prev, slug: productSlug }))
  }, [productSlug])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleVariantChange = (index: number, field: keyof VariantInput, value: string) => {
    const updated = [...variants]
    updated[index][field] = value
    setVariants(updated)
  }

  const addVariant = () => setVariants(prev => [...prev, { label: '', stock: '' }])
  const removeVariant = (index: number) => setVariants(prev => prev.filter((_, i) => i !== index))

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected])
    setPreviews(prev => [...prev, ...selected.map(f => URL.createObjectURL(f))])
  }

  const [keywordsInput, setKeywordsInput] = useState('')
  const handleKeywords = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setKeywordsInput(raw)
    setData(prev => ({ ...prev, keywords: raw.split(',').map(k => k.trim()).filter(Boolean) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("slug", data.slug)
      formData.append("category", data.category)
      formData.append("description", data.description)
      formData.append("hasVariants", String(data.hasVariants))
      formData.append("fragranceType", data.fragranceType)
      formData.append("price", data.price)
      formData.append("salePrice", data.salePrice)
      formData.append("onSale", String(data.onSale))

      data.keywords.forEach(k => formData.append("keywords", JSON.stringify(k)))

      variants.forEach(v => {
        formData.append("variants", JSON.stringify({
          label: v.label || 'Default',
          stock: v.stock,
        }))
      })

      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        })
        formData.append("images", compressed)
      }

      const res = await axios.post("/api/products", formData)

      if (res.status === 201) {
        setResult("✅ Product added successfully")
        setVariants([{ label: '', stock: '' }])
        setFiles([])
        setPreviews([])
        setData({
          name: '',
          slug: '',
          category: 'watches',
          description: '',
          keywords: [""] as string[],
          fragranceType: '',
          hasVariants: false,
          price: '',
          salePrice: '',
          onSale: false
        })
        
      }
    } catch (err) {
      console.error(err)
      setResult(
        axios.isAxiosError(err)
          ? `❌ ${err.response?.data?.message || "Failed to add product"}`
          : "❌ Failed to add product"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6 bg-gray-50 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-4">Add Product</h1>

        <input required name="name" value={data.name} onChange={handleChange} placeholder="Product Name" className="input" />

        <input required name="price" type="number" value={data.price} onChange={handleChange} placeholder="Price" className="input" />
        <label className="flex gap-2 items-center my-2">
          <input type="checkbox" name="onSale" checked={data.onSale} onChange={handleChange} />
          On Sale
        </label>
        {data.onSale && (
          <input name="salePrice" type="number" value={data.salePrice} onChange={handleChange} placeholder="Sale Price" className="input" />
        )}

        <select name="category" value={data.category} onChange={handleChange} className="input">
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>

        <textarea required name="description" value={data.description} onChange={handleChange} placeholder="Description" className="input h-24" />

        <input name="keywords" value={keywordsInput} onChange={handleKeywords} placeholder="Keywords (comma separated)" className="input" />

        {data.category.includes("perfumes") && (
          <input name="fragranceType" value={data.fragranceType} onChange={handleChange} placeholder="Fragrance Type" className="input" />
        )}

        {<label className="flex gap-2 items-center my-2">
          <input type="checkbox" checked={data.hasVariants}
            onChange={e =>
              setData(prev => ({
                ...prev,
                hasVariants: e.target.checked,
              }))
            } />
          Has Variants
        </label>}

        <h2 className="text-xl font-semibold mt-4">Variants</h2>

        {variants.map((v, i) => (
          <div key={i} className="border p-3 rounded-lg mt-2">
            <input placeholder="Label" value={v.label}
              onChange={e => handleVariantChange(i, "label", e.target.value)} className="input" />
            <input placeholder="Stock" type="number" value={v.stock}
              onChange={e => handleVariantChange(i, "stock", e.target.value)} className="input" />
            {variants.length > 1 && (
              <button type="button" onClick={() => removeVariant(i)} className="text-red-500 mt-1">
                Remove
              </button>
            )}
          </div>
        ))}

        {<button type="button" onClick={addVariant} className="mt-2 text-blue-600">
          + Add Variant
        </button>}

        <label className="mt-3 font-semibold block">Images: </label>
        <input type="file" multiple accept="image/*" required onChange={handleImageChange} className="input mt-2" />

        <div className="flex gap-3 mt-3 flex-wrap">
          {previews.map((src, i) => (
            <Image key={i} src={src} width={80} height={80} alt="" className="rounded" />
          ))}
        </div>

        <button disabled={loading} className="w-full bg-black text-white py-2 mt-4 rounded">
          {loading ? "Saving..." : "Add Product"}
        </button>

        <p className="text-center mt-2">{result}</p>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 10px;
        }
      `}</style>
    </main>
  )
}
