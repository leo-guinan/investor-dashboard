import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

interface StripePaymentModalProps {
  isDark: boolean;
  plan: {
    id: string;
    name: string;
    price: number;
  };
  onClose: () => void;
}

const stripePromise = loadStripe('your_publishable_key');

const StripePaymentModal: React.FC<StripePaymentModalProps> = ({ isDark, plan, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically:
      // 1. Call your backend to create a payment intent
      // 2. Use the client secret to confirm the payment
      // 3. Handle the result

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling would go here
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-md rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <CreditCard className="text-indigo-500" size={20} />
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Payment Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Card Information
            </label>
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {/* Stripe Elements would be mounted here */}
              <div className={`h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded`} />
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
              {error}
            </div>
          )}

          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="flex items-center gap-1.5">
              <Lock size={14} />
              Your payment information is secure
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Processing...' : `Pay $${plan.price}`}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StripePaymentModal;