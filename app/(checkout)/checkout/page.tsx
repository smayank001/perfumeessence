'use client';

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    setStatus("Sending...");
    setLoading(true);

    const orderData = {
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        onSale: item.onSale,
        salePrice: item.salePrice,
        finalPrice: item.finalPrice,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant?.label || "",
      })),
      totalPrice: totalAmount + 300,
      shippingCost: 300,
      userDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || "No email",
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode || "N/A",
      },
      notes: formData.notes || "No notes",
      paymentMethod: formData.paymentMethod,
    };

    const payload = new FormData();
    payload.append("orderData", JSON.stringify(orderData));
    if (paymentProof) payload.append("paymentProof", paymentProof);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("Order placed successfully!");
      clearCart();
      router.push(`/thank-you/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen pt-5 px-5 md:px-20 gap-10">
      {/* LEFT: FORM */}
      <div className="w-full md:w-2/3 border-r pr-5">
        <h1 className="text-3xl font-bold text-center mb-6 border-b pb-2">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        >
          <div className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number (+91)"
              required
              value={formData.phone}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              required
              value={formData.city}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
          </div>

          <div className="space-y-4">
            <input
              name="address"
              placeholder="Full Address"
              required
              value={formData.address}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code (optional)"
              value={formData.postalCode}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
            <textarea
              name="notes"
              placeholder="Order Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
              className="border w-full p-3 rounded-md outline-none border-gray-300"
            />
          </div>

          {/* Payment */}
          <div className="text-center md:col-span-2 border py-2 mt-2">
            <p>Payment Method</p>
            <select
              value={formData.paymentMethod}
              onChange={handleChange}
              name="paymentMethod"
              className="border rounded p-2 mt-1"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="bank">Online Transfer</option>
            </select>
          </div>

          {/* Bank Payment Proof */}
          {formData.paymentMethod === "bank" && (
            <div className="border border-blue-400 bg-blue-50 rounded-lg p-4 space-y-3 md:col-span-2">
              <h3 className="font-semibold text-blue-800 text-lg">
                Online Transfer
              </h3>
              <p className="text-sm text-blue-800">
                Indian transfer details are being configured. Please contact support for current payment instructions before transferring funds.
              </p>
              <label className="block text-sm font-medium text-gray-700 mt-2">
                Upload Payment Proof
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full mt-2 text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border file:border-gray-300 
                  file:bg-gray-200 hover:file:bg-gray-300"
              />
              {preview && (
                <div className="mt-3">
                  <Image
                    src={preview}
                    alt="Payment proof"
                    width={200}
                    height={200}
                    className="rounded-md border"
                  />
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className={`md:col-span-2 w-full py-3 rounded-md text-white transition ${
              loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Loading..." : "Place Order"}
          </button>
        </form>

        {status && (
          <p className="my-6 text-center text-black font-medium">{status}</p>
        )}
      </div>

      {/* RIGHT: CART SUMMARY */}
      <div className="w-full md:w-1/3 bg-gray-100 py-6 px-6 h-max sticky top-32">
        <h3 className="text-xl font-semibold mb-4">Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex gap-5">
                  {item.image ? (
                    <Image
                      width={70}
                      height={70}
                      className="object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-[70px] h-[70px] bg-gray-200 flex items-center justify-center text-xs">
                      No Img
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {item.name} {item.variant?.label === "default" ? "" : "(" + item.variant?.label + ")"}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">
                  ₹{item.finalPrice * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Shipping:</span>
              <span>300 INR</span>
            </div>
            <div className="flex justify-between mt-2 font-bold text-lg">
              <span>Total:</span>
              <span>{totalAmount + 300} INR</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;
