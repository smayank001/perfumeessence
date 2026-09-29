'use client';

import { ReviewType } from '@/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

const Page = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/review");
      setReviews(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error(error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id: string) => {

    if(!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`/api/review/${id}`);

      setReviews(prev => prev.filter(review => review._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">All Reviews</h1>

      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map(review => (
            <div
              key={review._id}
              className="bg-white p-4 rounded shadow"
            >
              <div className="mb-2">
                <p className="font-semibold">
                  {review.name}
                </p>
               
              </div>

              <div className="mb-3">
                <p>{review.message}</p>
                
              </div>

              <button
                onClick={() => deleteReview(review._id)}
                className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition"
              >
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Page;
