'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import ReviewModal from '@/components/customer/ReviewModel';

interface IReview {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const defaultTestimonials: IReview[] = [
  {
    _id: 'default-1',
    name: 'Ananya Sharma',
    message: 'The Moon Essence Extrait is simply extraordinary. The nocturnal violet and amber notes last well past 14 hours with the most mesmerizing sillage. Truly international haute parfumerie.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'default-2',
    name: 'Vikramaditya Roy',
    message: 'Exquisite packaging and unmistakable quality. My order arrived in Mumbai in 2 days. The craftsmanship of both the fragrance and the gold-plated bracelet exceeded all expectations.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'default-3',
    name: 'Meera Kapur',
    message: 'Finding niche-level extrait de parfum in India at this sublime level of craftsmanship was rare until I discovered THE PERFUME ESSENCE. It has become my everyday nocturnal signature.',
    createdAt: new Date().toISOString(),
  },
];

const Reviews = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/review');
      const data = await response.json();
      const fetched = Array.isArray(data?.data) ? data.data : [];
      setReviews(fetched.length > 0 ? fetched : defaultTestimonials);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews(defaultTestimonials);
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

  const displayList = reviews.length > 0 ? reviews : defaultTestimonials;

  return (
    <section className="relative w-full bg-[#F4EFE6] py-16 md:py-28 px-4 sm:px-6 lg:px-10 border-b border-[#E3DACD] font-serif overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#E3DACD]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#C9A45C]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8B6FA8] font-normal">
                VOICES OF THE CONNOISSEUR
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#21152F] font-normal tracking-tight">
              What Our Patrons Say
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] px-5 py-3 bg-[#21152F] text-[#F7F3EA] hover:bg-[#C9A45C] hover:text-[#18131D] transition-all self-start md:self-auto cursor-pointer shadow-sm"
          >
            <FiPlus className="w-4 h-4 text-[#C9A45C]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Swiper
            spaceBetween={24}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            className="!pb-4"
          >
            {displayList.map((review) => (
              <SwiperSlide key={review._id} className="h-auto">
                <div className="bg-[#FFFFFF] p-8 sm:p-10 border border-[#E3DACD] flex flex-col justify-between h-full min-h-[300px] transition-all duration-400 hover:border-[#C9A45C] hover:shadow-[0_12px_32px_-12px_rgba(33,21,47,0.08)]">
                  <div>
                    <span className="text-4xl text-[#C9A45C] leading-none block mb-4 font-serif">
                      “
                    </span>
                    <p className="text-sm sm:text-base text-[#21152F] font-normal leading-relaxed italic mb-8">
                      {review.message}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#F4EFE6] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-normal text-[#21152F] tracking-wide">
                        {review.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B6FA8] mt-0.5">
                        Verified Patron • {new Date(review.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#21152F] text-[#F7F3EA] border border-[#C9A45C]/40 flex items-center justify-center text-xs uppercase font-serif">
                      {review.name?.charAt(0) || 'P'}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              ref={prevRef}
              aria-label="Previous Testimonials"
              className="w-10 h-10 border border-[#E3DACD] bg-[#FFFFFF] hover:bg-[#21152F] hover:text-[#F7F3EA] hover:border-[#21152F] transition-all flex items-center justify-center text-[#21152F] cursor-pointer shadow-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next Testimonials"
              className="w-10 h-10 border border-[#E3DACD] bg-[#FFFFFF] hover:bg-[#21152F] hover:text-[#F7F3EA] hover:border-[#21152F] transition-all flex items-center justify-center text-[#21152F] cursor-pointer shadow-sm"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchReviews}
      />
    </section>
  );
};

export default Reviews;