'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ReviewModal = ({ isOpen, onClose, onSuccess }: ModalProps) => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
        setFormData({ name: '', message: '' });
        onClose();
      }
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-serif">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#19151D]/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFFFFF] w-full max-w-lg border border-[#D8CEDA] shadow-2xl p-6 sm:p-8 relative z-10 select-none"
          >
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-[#F5F0F7]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#68447F]">
                  Your Experience
                </span>
                <h3 className="text-2xl text-[#21132F] font-normal tracking-wide mt-0.5">
                  Share Your Review
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#A58AB8] hover:text-[#21132F] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5 block">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priyanshu Mehta"
                  className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#6E6472] mb-1.5 block">
                  Your Review / Impressions
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your thoughts on the sillage, longevity, packaging, or craftsmanship..."
                  className="w-full px-4 py-3 border border-[#D8CEDA] bg-[#F7F2E8] focus:bg-[#FFFFFF] focus:border-[#21132F] outline-none text-sm text-[#21132F] font-serif transition-all resize-none"
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#21132F] text-[#F7F2E8] border border-[#C8A45D] py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#C8A45D] hover:text-[#19151D] hover:border-[#C8A45D] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {loading ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;