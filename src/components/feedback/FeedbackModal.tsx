import React, { useState } from 'react';
import { X, MessageSquare, ThumbsUp, ThumbsDown, Star, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackModalProps {
  isDark: boolean;
  onClose: () => void;
  userEmail: string;
  userName: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isDark, onClose, userEmail, userName }) => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    category: '',
    sentiment: null as 'positive' | 'negative' | null,
    comment: ''
  });

  const categories = [
    { id: 'usability', label: 'Ease of Use', icon: '🎯' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'performance', label: 'Performance', icon: '🚀' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'ai', label: 'AI Analysis', icon: '🤖' },
    { id: 'other', label: 'Other', icon: '💭' }
  ];

  const handleSubmit = async () => {
    console.log('Feedback submitted:', {
      ...feedback,
      userEmail,
      userName,
      timestamp: new Date().toISOString()
    });
    
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (showThankYou) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative w-full max-w-md rounded-xl shadow-lg ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } p-6 text-center`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
          </motion.div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Thank You for Your Feedback!
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your insights help us improve and serve you better.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative w-full max-w-lg rounded-xl shadow-lg ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={20} />
            <h2 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Help Us Improve
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
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  How would you rate your overall experience?
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFeedback(prev => ({ ...prev, rating }));
                        setStep(2);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        feedback.rating === rating
                          ? 'text-yellow-500'
                          : isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      <Star
                        size={32}
                        fill={feedback.rating >= rating ? 'currentColor' : 'none'}
                        className="transition-colors duration-200"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  What aspect would you like to comment on?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFeedback(prev => ({ ...prev, category: category.id }));
                        setStep(3);
                      }}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                        feedback.category === category.id
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : isDark
                            ? 'border-gray-700 hover:border-gray-600'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {category.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFeedback(prev => ({ ...prev, sentiment: 'positive' }));
                      setStep(4);
                    }}
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      feedback.sentiment === 'positive'
                        ? 'border-green-500 bg-green-500/10'
                        : isDark
                          ? 'border-gray-700 hover:border-gray-600'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ThumbsUp 
                      size={24} 
                      className={`mx-auto transition-colors duration-200 ${
                        feedback.sentiment === 'positive' 
                          ? 'text-green-500' 
                          : isDark ? 'text-green-400' : 'text-green-600'
                      }`}
                    />
                    <span className={`block mt-2 text-sm ${
                      feedback.sentiment === 'positive'
                        ? 'text-green-500'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      What's working well?
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFeedback(prev => ({ ...prev, sentiment: 'negative' }));
                      setStep(4);
                    }}
                    className={`flex-1 p-4 rounded-lg border transition-all ${
                      feedback.sentiment === 'negative'
                        ? 'border-red-500 bg-red-500/10'
                        : isDark
                          ? 'border-gray-700 hover:border-gray-600'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ThumbsDown 
                      size={24} 
                      className={`mx-auto transition-colors duration-200 ${
                        feedback.sentiment === 'negative' 
                          ? 'text-red-500' 
                          : isDark ? 'text-red-400' : 'text-red-600'
                      }`}
                    />
                    <span className={`block mt-2 text-sm ${
                      feedback.sentiment === 'negative'
                        ? 'text-red-500'
                        : isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      What could be better?
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg ${
                    feedback.sentiment === 'positive'
                      ? isDark ? 'bg-green-900/20' : 'bg-green-50'
                      : isDark ? 'bg-red-900/20' : 'bg-red-50'
                  }`}>
                    <h3 className={`text-sm font-medium mb-1 ${
                      feedback.sentiment === 'positive'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                      {feedback.sentiment === 'positive' 
                        ? "Share What's Working Well"
                        : 'What Can Be Improved'
                      }
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feedback.sentiment === 'positive'
                        ? 'Tell us what features or aspects you find most valuable'
                        : 'Let us know what challenges you face or what could work better'
                      }
                    </p>
                  </div>

                  <textarea
                    value={feedback.comment}
                    onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder={feedback.sentiment === 'positive' 
                      ? "What aspects do you enjoy the most?"
                      : "What specific improvements would you suggest?"
                    }
                    rows={4}
                    className={`w-full p-3 rounded-lg border resize-none transition-colors duration-200 ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-indigo-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                    }`}
                  />
                  
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>Your feedback will be sent as:</p>
                    <p className="mt-1">{userName}</p>
                    <p>{userEmail}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 text-sm rounded-lg ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back
            </motion.button>
          )}
          
          <div className="flex gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className={`px-4 py-2 text-sm rounded-lg ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancel
            </motion.button>
            
            {step === 4 && (
              <motion.button
                whileHover={feedback.comment.trim() ? { scale: 1.02 } : {}}
                whileTap={feedback.comment.trim() ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!feedback.comment.trim()}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  feedback.comment.trim()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
                <span>Submit Feedback</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackModal;