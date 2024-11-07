import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  isDark?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, isDark = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-[9999] px-2 py-1 text-xs rounded shadow-lg whitespace-pre-wrap -top-8 left-1/2 transform -translate-x-1/2 max-w-[200px]"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            color: isDark ? '#f3f4f6' : '#1f2937',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;