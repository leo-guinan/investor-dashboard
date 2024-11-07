import React, { useState } from 'react';
import { LogOut, ChevronDown, Coins, Settings, CreditCard } from 'lucide-react';
import PricingModal from './pricing/PricingModal';

interface UserProfileProps {
  isDark: boolean;
  onShowSettings?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isDark, onShowSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [tokens] = useState(10000);

  const user = {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 p-4 ${
          isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-lg">{user.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 text-left">
          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user.name}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {user.email}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm">
            <Coins size={14} className={isDark ? 'text-yellow-500' : 'text-yellow-600'} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              10K tokens left
            </span>
          </div>
        </div>
        <ChevronDown 
          size={20} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 mt-1 py-1 shadow-lg rounded-md z-50 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <button
            onClick={() => {
              if (onShowSettings) {
                onShowSettings();
                setIsOpen(false);
              }
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              setShowPricing(true);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CreditCard size={16} />
            <span>Pricing</span>
          </button>

          <button
            onClick={() => {
              // Handle logout
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      )}

      {showPricing && (
        <PricingModal
          isDark={isDark}
          onClose={() => setShowPricing(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;