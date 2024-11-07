import React from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Clock, Eye, Zap, Calendar, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

interface DashboardModalProps {
  isDark: boolean;
  onClose: () => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isDark, onClose }) => {
  // Mock data for demonstration
  const metrics = {
    totalDeals: 156,
    totalGrowth: 23.5,
    dailyAverage: 12,
    dailyGrowth: -8.2,
    goodFitDeals: 48,
    goodFitPercentage: 30.8,
    manuallyReviewed: 89,
    reviewedPercentage: 57.1,
    timeSaved: 45,
    totalTimeSaved: 117
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color,
    suffix = '',
    description
  }: { 
    title: string;
    value: number;
    change?: number;
    icon: React.ElementType;
    color: string;
    suffix?: string;
    description?: string;
  }) => (
    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs ${
            change >= 0 
              ? 'text-green-500 bg-green-500/10' 
              : 'text-red-500 bg-red-500/10'
          }`}>
            {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {title}
      </h3>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      {description && (
        <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-5xl rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Deal Flow Analytics
            </h2>
            <p className={`mt-0.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your deal flow metrics and insights at a glance
            </p>
          </div>
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

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title="Total Deals Processed"
              value={metrics.totalDeals}
              change={metrics.totalGrowth}
              icon={TrendingUp}
              color="bg-gradient-to-br from-indigo-500 to-purple-600"
              description="Total number of pitch decks analyzed"
            />
            
            <StatCard
              title="Daily Average"
              value={metrics.dailyAverage}
              change={metrics.dailyGrowth}
              icon={Calendar}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              description="Deals processed per day"
            />

            <StatCard
              title="Good Fit Deals"
              value={metrics.goodFitDeals}
              icon={Target}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              suffix={` (${metrics.goodFitPercentage}%)`}
              description="Deals matching your investment criteria"
            />

            <StatCard
              title="Manually Reviewed"
              value={metrics.manuallyReviewed}
              icon={Eye}
              color="bg-gradient-to-br from-amber-500 to-orange-600"
              suffix={` (${metrics.reviewedPercentage}%)`}
              description="Deals you've personally reviewed"
            />

            <StatCard
              title="Time Saved Per Deal"
              value={metrics.timeSaved}
              icon={Clock}
              color="bg-gradient-to-br from-rose-500 to-pink-600"
              suffix="min"
              description="Average time saved on initial screening"
            />

            <StatCard
              title="Total Time Saved"
              value={metrics.totalTimeSaved}
              icon={Zap}
              color="bg-gradient-to-br from-violet-500 to-purple-600"
              suffix="hrs"
              description="Total time saved using AI analysis"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardModal;