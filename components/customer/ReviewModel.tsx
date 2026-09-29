"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { serif } from '@/lib/fonts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void
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
        alert("Review submitted successfully!");
        onSuccess();
        setFormData({ name: '', message: '' });
        onClose();
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`${serif.className} text-2xl font-bold italic`}>Share your experience</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Your Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-ctr/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="What did you think of THE PERFUME ESSENCE?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-ctr/20 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-ctr transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;