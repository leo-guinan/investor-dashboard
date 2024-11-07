import React, { useState } from 'react';
import { X, Copy, Check, Building2, Users, TrendingUp, DollarSign } from 'lucide-react';
import type { FileData } from '../../App';

interface ShareDealModalProps {
  isDark: boolean;
  onClose: () => void;
  dealData: FileData;
}

const ShareDealModal: React.FC<ShareDealModalProps> = ({ isDark, onClose, dealData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const shareUrl = `https://app.example.com/deals/${dealData.company.toLowerCase()}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className={`relative w-full max-w-lg rounded-xl shadow-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Share This Deal
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
        <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Company & Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="text-indigo-500 shrink-0" size={20} />
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {dealData.company} - Executive Summary
              </h3>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Revolutionizing the rental market with a technology-driven platform for efficiency, transparency, and convenience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Market & Traction */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-500 shrink-0" size={16} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Market & Traction 
                </span>
              </div>
              <ul className={`text-xs space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Market size: $40B SAM</li>
                <li>• 125% YoY growth</li>
                <li>• $2.5M ARR</li>
                <li>• 15 enterprise clients</li>
              </ul>
            </div>

            {/* Investment */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="text-emerald-500 shrink-0" size={16} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Investment Ask 
                </span>
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>• {dealData.funding}</p>
                <p>• Product development</p>
                <p>• Market expansion</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="text-purple-500 shrink-0" size={16} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Founding Team 
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dealData.founders.map((founder, index) => (
                <div key={index} className="text-xs">
                  <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {founder.name}
                  </p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {founder.role} • {founder.background}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm rounded-lg ${
              isDark
                ? 'text-gray-300 hover:bg-gray-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Close
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDealModal;