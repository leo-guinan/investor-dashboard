import React from 'react';
import { motion } from 'framer-motion';
import { Plan } from './types';

interface PricingPlanProps {
  plan: Plan;
  billingCycle: 'monthly' | 'yearly';
  isDark: boolean;
  onUpgrade: (plan: Plan) => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  plan,
  billingCycle,
  isDark,
  onUpgrade
}) => {
  const getPrice = () => {
    if (billingCycle === 'monthly') {
      return {
        monthly: plan.monthlyPrice,
        total: null
      };
    } else {
      return {
        monthly: Math.round(plan.yearlyPrice / 12),
        total: plan.yearlyPrice
      };
    }
  };

  const getSavings = () => {
    if (billingCycle === 'yearly') {
      const monthlyTotal = plan.monthlyPrice * 12;
      const savings = monthlyTotal - plan.yearlyPrice;
      const savingsPercent = Math.round((savings / monthlyTotal) * 100);
      return { amount: savings, percent: savingsPercent };
    }
    return null;
  };

  const pricing = getPrice();
  const savings = getSavings();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col p-4 rounded-xl border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
    >
      {savings && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium text-green-500 bg-green-500/10 rounded-full">
          Save {savings.percent}%
        </span>
      )}

      <div className="flex-1 space-y-3">
        <div>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {plan.name}
          </h3>
          <div className="mt-1">
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ${pricing.monthly}
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                /mo
              </span>
            </div>
            {pricing.total && (
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                ${pricing.total} billed yearly
              </div>
            )}
            <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {plan.tokens}
              {plan.originalTokens && (
                <span className="ml-2 line-through opacity-50">
                  {plan.originalTokens}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {plan.description}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Billed {billingCycle === 'yearly' ? 'yearly' : 'monthly'}
          {savings && (
            <span className="block text-green-500 font-medium mt-1">
              Save ${savings.amount} per year
            </span>
          )}
        </p>

        <button
          onClick={() => onUpgrade(plan)}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            plan.id === 'pro'
              ? isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {plan.id === 'pro' ? 'Manage current plan' : `Upgrade to ${plan.name}`}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingPlan;