import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PricingPlan from './PricingPlan';
import BillingToggle from './BillingToggle';
import { Plan } from './types';
import StripePaymentModal from './StripePaymentModal';

interface PricingModalProps {
  isDark: boolean;
  onClose: () => void;
}

const plans: Plan[] = [
  {
    id: 'pro',
    name: 'Pro',
    tokens: '10M tokens',
    monthlyPrice: 20,
    yearlyPrice: 192,
    description: 'Ideal for hobbyists and casual users for light, exploratory use.'
  },
  {
    id: 'pro-50',
    name: 'Pro 50',
    tokens: '26M tokens',
    originalTokens: '25M tokens',
    monthlyPrice: 50,
    yearlyPrice: 480,
    savings: 'Save 3%',
    description: 'Designed for professionals who need to use PreloVC a few times per week.'
  },
  {
    id: 'pro-100',
    name: 'Pro 100',
    tokens: '55M tokens',
    originalTokens: '50M tokens',
    monthlyPrice: 100,
    yearlyPrice: 960,
    savings: 'Save 9%',
    description: 'Perfect for heavy users looking to enhance daily workflows.'
  }
];

const PricingModal: React.FC<PricingModalProps> = ({ isDark, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showStripeModal, setShowStripeModal] = useState(false);

  const handleUpgrade = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowStripeModal(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative w-full max-w-3xl rounded-xl shadow-lg overflow-hidden ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Upgrade PreloVC
            </h2>

            <div className="flex items-center gap-4">
              <BillingToggle
                isDark={isDark}
                billingCycle={billingCycle}
                onChange={setBillingCycle}
              />

              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-800 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {plans.map((plan) => (
                <PricingPlan
                  key={plan.id}
                  plan={plan}
                  billingCycle={billingCycle}
                  isDark={isDark}
                  onUpgrade={handleUpgrade}
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Looking for Team or Enterprise Plans?{' '}
                <button className="text-indigo-500 hover:text-indigo-400 font-medium">
                  Contact Sales
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {showStripeModal && selectedPlan && (
          <StripePaymentModal
            isDark={isDark}
            plan={{
              ...selectedPlan,
              price: billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice
            }}
            onClose={() => setShowStripeModal(false)}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default PricingModal;