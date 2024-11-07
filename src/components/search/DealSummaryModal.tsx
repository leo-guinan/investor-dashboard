import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import CircularProgress from '../CircularProgress';

interface DealSummaryModalProps {
  isDark: boolean;
  deal: {
    company: string;
    oneliner: string;
    metrics: {
      market: number;
      team: number;
      vcMatch: number;
      product: number;
      traction: number;
    };
  };
  onClose: () => void;
}

const DealSummaryModal: React.FC<DealSummaryModalProps> = ({ isDark, deal, onClose }) => {
  const metrics = [
    { label: 'VC MATCH', value: deal.metrics.vcMatch },
    { label: 'MARKET', value: deal.metrics.market },
    { label: 'TEAM', value: deal.metrics.team },
    { label: 'PRODUCT', value: deal.metrics.product },
    { label: 'TRACTION', value: deal.metrics.traction }
  ];

  function getMetricColor(value: number) {
    if (value >= 90) return 'rgb(34 197 94)';
    if (value >= 70) return 'rgb(234 179 8)';
    if (value >= 50) return 'rgb(249 115 22)';
    return 'rgb(239 68 68)';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-lg rounded-xl shadow-lg ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {deal.company}
          </h2>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {deal.oneliner}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="mx-auto mb-2">
                  <CircularProgress
                    value={metric.value}
                    color={getMetricColor(metric.value)}
                    isDark={isDark}
                    size={64}
                    label={metric.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DealSummaryModal;