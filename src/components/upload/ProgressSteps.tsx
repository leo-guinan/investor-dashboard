import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  isDark: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep, isDark }) => {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div key={step.label} className="relative">
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className={`absolute left-4 top-8 w-0.5 h-12 ${
                index < currentStep
                  ? 'bg-indigo-500'
                  : isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`} />
            )}

            <div className="relative flex items-start gap-3">
              {/* Status Circle */}
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                isCompleted
                  ? 'bg-indigo-500 border-indigo-500'
                  : isActive
                    ? 'border-indigo-500 animate-pulse'
                    : isDark
                      ? 'border-gray-700'
                      : 'border-gray-200'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className={`w-2 h-2 rounded-full ${
                    isActive
                      ? 'bg-indigo-500'
                      : isDark
                        ? 'bg-gray-700'
                        : 'bg-gray-200'
                  }`} />
                )}

                {/* Processing Animation */}
                {isActive && (
                  <div className="absolute -inset-1">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-500 animate-ping" />
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h3 className={`text-sm font-medium ${
                  isActive
                    ? 'text-indigo-500'
                    : isDark
                      ? 'text-gray-200'
                      : 'text-gray-900'
                }`}>
                  {step.label}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;