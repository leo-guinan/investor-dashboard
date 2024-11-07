import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, Zap, Clock, Target, Link as LinkIcon } from 'lucide-react';

interface ShareLinkModalProps {
  isDark: boolean;
  onClose: () => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ isDark, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = 'https://prelovc.com/invest/sarah-chen';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-lg rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <LinkIcon className="text-indigo-500" size={20} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Share Your Link
            </h2>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Automate Your Deal Flow
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Share your unique link with founders and let AI do the heavy lifting
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Clock className="mx-auto mb-2 text-blue-500" size={24} />
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Save 45 minutes per deal review
              </p>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Target className="mx-auto mb-2 text-green-500" size={24} />
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Auto-filter best-fit opportunities
              </p>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Zap className="mx-auto mb-2 text-amber-500" size={24} />
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Instant AI-powered insights
              </p>
            </div>
          </div>

          <div className={`flex gap-2 p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <input
              type="text"
              value={shareLink}
              readOnly
              className={`flex-1 px-3 py-2 text-sm rounded bg-transparent ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            When founders upload their pitch deck through your link,
            you'll receive instant notifications and AI analysis.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareLinkModal;