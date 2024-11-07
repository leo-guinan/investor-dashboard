import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Upload, MessageSquare, Search, TrendingUp, Users, Zap } from 'lucide-react';

interface QuickTourModalProps {
  isDark: boolean;
  onClose: () => void;
}

interface TourStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const QuickTourModal: React.FC<QuickTourModalProps> = ({ isDark, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps: TourStep[] = [
    {
      icon: <Upload className="text-indigo-500" size={32} />,
      title: "Upload & Analyze Pitch Decks",
      description: "Instantly analyze pitch decks with our AI to get comprehensive insights, metrics, and investment recommendations.",
      color: "bg-indigo-500"
    },
    {
      icon: <MessageSquare className="text-emerald-500" size={32} />,
      title: "AI-Powered Chat Assistant",
      description: "Get instant answers about any deal. Our AI assistant helps you analyze deals, compare metrics, and make informed decisions.",
      color: "bg-emerald-500"
    },
    {
      icon: <Search className="text-purple-500" size={32} />,
      title: "Smart Deal Search",
      description: "Quickly find and filter deals based on industry, investment stage, metrics, and more with our powerful search.",
      color: "bg-purple-500"
    },
    {
      icon: <TrendingUp className="text-blue-500" size={32} />,
      title: "Deal Analytics",
      description: "Track key metrics, market trends, and investment opportunities with our comprehensive analytics dashboard.",
      color: "bg-blue-500"
    },
    {
      icon: <Users className="text-amber-500" size={32} />,
      title: "Team Collaboration",
      description: "Share deals, insights, and feedback with your team to make better investment decisions together.",
      color: "bg-amber-500"
    },
    {
      icon: <Zap className="text-rose-500" size={32} />,
      title: "Pro Features",
      description: "Unlock advanced features, unlimited analysis, and priority support with our Pro subscription.",
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-2xl rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg z-10 transition-colors ${
            isDark 
              ? 'hover:bg-gray-800 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="flex gap-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? tourSteps[currentStep].color
                        : index < currentStep
                          ? isDark ? 'bg-gray-700' : 'bg-gray-200'
                          : isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>

              {/* Step Content */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  {tourSteps[currentStep].icon}
                </motion.div>

                <h2 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {tourSteps[currentStep].title}
                </h2>

                <p className={`text-lg max-w-lg mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {tourSteps[currentStep].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className={`p-4 border-t flex justify-between items-center ${
          isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <button
            onClick={() => setCurrentStep(current => current - 1)}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? isDark
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 cursor-not-allowed'
                : isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>

          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentStep + 1} of {tourSteps.length}
          </div>

          {currentStep < tourSteps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(current => current + 1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <span>Get Started</span>
              <Zap size={20} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickTourModal;