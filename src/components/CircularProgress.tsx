import React from 'react';

interface CircularProgressProps {
  value: number;
  color: string;
  size?: number;
  isDark?: boolean;
  showAnimation?: boolean;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  value, 
  color, 
  size = 64,
  isDark = true,
  showAnimation = true,
  label
}) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) / 100) * circumference;
  const center = size / 2;
  const fontSize = Math.max(size * 0.2, 12);
  
  const getGradient = () => {
    const hue = Math.min(value * 1.2, 120);
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div 
      className="relative" 
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={showAnimation ? 'animate-in fade-in duration-500' : ''}
      >
        <defs>
          <linearGradient id={`gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={getGradient()} />
          </linearGradient>
        </defs>

        <circle
          className={`${showAnimation ? 'animate-pulse' : ''}`}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={size * 0.08}
          stroke={`url(#gradient-${value})`}
          fill="none"
          opacity={0.15}
        />
        
        <circle
          className={`transition-all duration-1000 ease-out ${
            showAnimation ? 'animate-in zoom-in-50 duration-500' : ''
          }`}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={size * 0.08}
          stroke={`url(#gradient-${value})`}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          transform={`rotate(-90 ${center} ${center})`}
        >
          {showAnimation && (
            <animate
              attributeName="stroke-dashoffset"
              from={circumference}
              to={progress}
              dur="1.5s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            />
          )}
        </circle>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className={`font-medium ${isDark ? 'fill-white' : 'fill-gray-900'}`}
          style={{ fontSize }}
        >
          <tspan className="text-shadow-sm">{value}</tspan>
        </text>
      </svg>

      {label && (
        <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap
          ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;