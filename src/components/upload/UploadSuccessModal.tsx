import React from 'react';
import { X, Star, TrendingUp, Users, DollarSign, ThumbsUp, ThumbsDown, Heart, Mail, BookmarkPlus } from 'lucide-react';
import CircularProgress from '../CircularProgress';

interface UploadSuccessModalProps {
  isDark: boolean;
  onClose: () => void;
  data: {
    company: string;
    match: number;
    funding: string;
    industry: string;
    traction?: {
      revenue?: string;
      growth?: string;
      customers?: string;
    };
    founders: Array<{
      name: string;
      role: string;
      background: string;
    }>;
  };
}

const UploadSuccessModal: React.FC<UploadSuccessModalProps> = ({ isDark, onClose, data }) => {
  const getRecommendationStatus = (match: number) => {
    if (match >= 85) return { text: 'Strong Match', icon: ThumbsUp, color: 'text-green-500' };
    if (match >= 70) return { text: 'Potential Match', icon: Star, color: 'text-yellow-500' };
    return { text: 'Not a Match', icon: ThumbsDown, color: 'text-red-500' };
  };

  const recommendation = getRecommendationStatus(data.match);
  const RecommendationIcon = recommendation.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className={`relative w-full max-w-2xl rounded-xl shadow-lg overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header with Gradient */}
        <div className={`relative p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
          
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  recommendation.color
                } ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center gap-1.5">
                    <RecommendationIcon size={16} />
                    <span>{recommendation.text}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                }`}>
                  {data.industry}
                </div>
              </div>

              <h2 className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {data.company}
              </h2>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-500'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-6">
            {/* Match Score */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CircularProgress
                  value={data.match}
                  color={
                    data.match >= 90 ? 'rgb(34 197 94)' :
                    data.match >= 70 ? 'rgb(234 179 8)' :
                    data.match >= 50 ? 'rgb(249 115 22)' :
                    'rgb(239 68 68)'
                  }
                  size={48}
                  isDark={isDark}
                />
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Match Score
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Based on your criteria
                  </p>
                </div>
              </div>
            </div>

            {/* Investment Ask */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-500" size={18} />
                <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Investment Ask
                </h3>
              </div>
              <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {data.funding}
              </p>
            </div>
          </div>

          {/* Traction */}
          {data.traction && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={18} />
                <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Traction
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {data.traction.revenue && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Revenue
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {data.traction.revenue}
                    </p>
                  </div>
                )}
                {data.traction.growth && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Growth
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {data.traction.growth}
                    </p>
                  </div>
                )}
                {data.traction.customers && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Customers
                    </p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {data.traction.customers}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Founding Team */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="text-purple-500" size={18} />
              <h3 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Founding Team
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.founders.map((founder, index) => (
                <div
                  key={founder.name}
                  className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {founder.name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {founder.role}
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {founder.background}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className={`p-4 border-t ${
          isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}>
                <Heart size={20} />
              </button>
              <button className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}>
                <BookmarkPlus size={20} />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              <Mail size={18} />
              <span>Contact Founder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSuccessModal;