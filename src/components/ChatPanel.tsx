import React, { useState } from 'react';
import { Send, Paperclip, Smile, Mic, MessageSquare, Zap, Search, Bell, HelpCircle, LayoutDashboard } from 'lucide-react';
import FeedbackModal from './feedback/FeedbackModal';
import QuickTourModal from './tour/QuickTourModal';
import NotificationsModal from './notifications/NotificationsModal';
import DashboardModal from './dashboard/DashboardModal';

interface ChatPanelProps {
  isDark: boolean;
  onUpgradeClick: () => void;
  onShowSearchDeals: () => void;
}

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isDark, onUpgradeClick, onShowSearchDeals }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuickTour, setShowQuickTour] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm ready to help analyze your documents. You can upload a file or share a URL to get started.",
      isAI: true,
      timestamp: new Date()
    }
  ]);

  const handleMessageSubmit = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: message,
        isAI: false,
        timestamp: new Date()
      }]);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className={`px-4 py-2.5 border-b ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-gray-50/80 border-gray-200'
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQuickTour(true)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
            >
              <HelpCircle size={16} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Quick Tour</span>
            </button>

            <button 
              onClick={() => setShowFeedback(true)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
            >
              <MessageSquare size={16} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Give Feedback</span>
            </button>

            <button
              onClick={onShowSearchDeals}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
            >
              <Search size={16} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Search Deals</span>
            </button>

            <button
              onClick={() => setShowDashboard(true)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
            >
              <LayoutDashboard size={16} className="transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setShowNotifications(true)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700'
              }`}
            >
              <div className="relative">
                <Bell size={16} className="transition-transform group-hover:scale-110" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </span>
              </div>
              <span className="text-sm font-medium">Notifications</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className={`h-4 w-px ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            
            <button
              onClick={onUpgradeClick}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                isDark
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-500/20'
              }`}
            >
              <Zap size={16} className="transition-transform group-hover:scale-110 text-white" />
              <span className="text-sm font-medium">
                Upgrade to Pro
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 mb-6 ${!msg.isAI && 'justify-end'}`}>
            {msg.isAI && (
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                AI
              </div>
            )}
            <div className={`flex-1 ${
              msg.isAI 
                ? `${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-sm max-w-2xl` 
                : `${isDark ? 'bg-indigo-600' : 'bg-indigo-500'} text-white rounded-lg p-4 shadow-sm max-w-2xl ml-12`
            }`}>
              <p className={msg.isAI ? `${isDark ? 'text-gray-300' : 'text-gray-700'}` : 'text-white'}>
                {msg.text}
              </p>
            </div>
            {!msg.isAI && (
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className={`flex items-center gap-2 p-2 rounded-lg border ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <button className={`p-2 rounded-full hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()}
            placeholder="Type a message..."
            className={`flex-1 bg-transparent border-none focus:outline-none ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          
          <button 
            onClick={handleVoiceInput}
            className={`p-2 rounded-full hover:bg-gray-700 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } ${isRecording ? 'bg-red-500 text-white' : ''}`}
          >
            <Mic size={20} />
          </button>
          
          <button className={`p-2 rounded-full hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Smile size={20} />
          </button>
          
          <button 
            onClick={handleMessageSubmit}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal
          isDark={isDark}
          onClose={() => setShowFeedback(false)}
          userEmail="sarah.chen@example.com"
          userName="Sarah Chen"
        />
      )}

      {showQuickTour && (
        <QuickTourModal
          isDark={isDark}
          onClose={() => setShowQuickTour(false)}
        />
      )}

      {showNotifications && (
        <NotificationsModal
          isDark={isDark}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showDashboard && (
        <DashboardModal
          isDark={isDark}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
};

export default ChatPanel;