"use client";

import React, { useEffect, useRef, useState } from 'react';
import { serif } from '@/lib/fonts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import ReviewModal from '@/components/customer/ReviewModel';

interface IReview {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const Reviews = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);
  
 const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/review');
      const data = await response.json();
      setReviews(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [isLoading, reviews]);

  return (
    <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className={`${serif.className} text-[30px] sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2`}>
              What Customers Say
            </h2>
            <p className="text-gray-500 font-light tracking-wide">Real stories from our global community.</p>
          </div>

          {/* ADD REVIEW BUTTON */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-ctr transition-colors duration-300 shadow-lg group"
          >
            <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-sm font-medium uppercase tracking-wider">Write a Review</span>
          </button>
        </div>

        {isLoading ? (
          /* Basic Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[250px] bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <>
            <Swiper
              spaceBetween={30}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Navigation]}
              className="mySwiper !pb-14"
            >
              {(reviews || []).map((review) => (
                <SwiperSlide key={review._id}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full min-h-[280px]">
                    <div>
                      <span className="text-5xl text-ctr/20 leading-none block mb-4">“</span>
                      <p className="text-gray-600 italic leading-relaxed mb-6">
                        {review.message}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-800 leading-tight">{review.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="h-10 w-10 bg-ctr/10 rounded-full flex items-center justify-center text-ctr font-bold uppercase text-sm border border-ctr/20">
                        {review.name?.charAt(0) || "U"}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-4">
              <button ref={prevRef} className="p-4 bg-ctr rounded-full text-white hover:text-black border border-gray-200 hover:bg-white hover:shadow-md transition-all"><FiArrowLeft /></button>
              <button ref={nextRef} className="p-4 bg-ctr rounded-full text-white hover:text-black border border-gray-200 hover:bg-white hover:shadow-md transition-all"><FiArrowRight /></button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8">
            <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-ctr transition-colors text-sm font-medium"
            >
              Write First Review
            </button>
          </div>
        )}
      </div>

      {/* MODAL COMPONENT */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchReviews} />
    </section>
  )
}

export default Reviews;