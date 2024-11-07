import React from 'react';

interface BillingToggleProps {
  isDark: boolean;
  billingCycle: 'monthly' | 'yearly';
  onChange: (cycle: 'monthly' | 'yearly') => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({
  isDark,
  billingCycle,
  onChange
}) => {
  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => onChange('monthly')}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
          billingCycle === 'monthly'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
          billingCycle === 'yearly'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        Yearly
      </button>
    </div>
  );
};

export default BillingToggle;