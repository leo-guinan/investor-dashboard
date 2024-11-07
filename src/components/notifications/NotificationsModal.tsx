import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Upload, Zap, Star, Gift, Trash2, Check, AlertCircle } from 'lucide-react';

interface NotificationsModalProps {
  isDark: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'upload' | 'tokens' | 'upgrade' | 'feature';
  title: string;
  description: string;
  time: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isDark, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'upload',
      title: 'New Pitch Decks Analyzed',
      description: '3 new pitch decks were analyzed in the last 24 hours',
      time: new Date(),
      read: false,
      action: {
        label: 'View Analysis',
        onClick: () => console.log('View analysis')
      }
    },
    {
      id: '2',
      type: 'tokens',
      title: 'Token Usage Alert',
      description: "You've used 85% of your monthly tokens. Consider upgrading to avoid interruption.",
      time: new Date(),
      read: false,
      action: {
        label: 'Upgrade Now',
        onClick: () => console.log('Upgrade')
      }
    },
    {
      id: '3',
      type: 'feature',
      title: 'New Feature: Quick Tour',
      description: 'Take a guided tour of our latest features and improvements.',
      time: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      read: false,
      action: {
        label: 'Take Tour',
        onClick: () => console.log('Start tour')
      }
    },
    {
      id: '4',
      type: 'upgrade',
      title: 'Unlock Pro Features',
      description: 'Get unlimited analysis, priority support, and advanced analytics.',
      time: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      read: false,
      action: {
        label: 'Learn More',
        onClick: () => console.log('Learn more')
      }
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="text-blue-500" size={20} />;
      case 'tokens':
        return <AlertCircle className="text-amber-500" size={20} />;
      case 'upgrade':
        return <Zap className="text-purple-500" size={20} />;
      case 'feature':
        return <Gift className="text-green-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const todayNotifications = notifications.filter(n => isToday(n.time));
  const previousNotifications = notifications.filter(n => !isToday(n.time));

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div className={`group p-4 transition-colors ${
      notification.read
        ? isDark ? 'bg-gray-900' : 'bg-white'
        : isDark ? 'bg-gray-800/50' : 'bg-gray-50'
    }`}>
      <div className="flex gap-4">
        <div className={`mt-1 ${!notification.read && 'animate-pulse'}`}>
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`text-sm font-medium mb-0.5 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {notification.title}
              </p>
              <p className={`text-sm mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {notification.description}
              </p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className={`p-1 rounded hover:bg-gray-700/50 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  <Check size={16} />
                </button>
              )}
              <button
                onClick={() => deleteNotification(notification.id)}
                className={`p-1 rounded hover:bg-gray-700/50 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="text-sm font-medium text-indigo-500 hover:text-indigo-400"
            >
              {notification.action.label}
            </button>
          )}
          <p className={`text-xs mt-2 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
              Math.ceil((notification.time.getTime() - Date.now()) / (1000 * 60 * 60)),
              'hour'
            )}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className={`relative w-full max-w-md rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell className={isDark ? 'text-gray-400' : 'text-gray-600'} size={20} />
            <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h2>
            {notifications.some(n => !n.read) && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Today's Notifications */}
          <div>
            <div className="px-4 py-2 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Today
              </h3>
            </div>
            {todayNotifications.length > 0 ? (
              todayNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="p-8 text-center">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  No new notifications today
                </p>
              </div>
            )}
          </div>

          {/* Previous Notifications */}
          <div>
            <div className="px-4 py-2 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Previous
              </h3>
            </div>
            {previousNotifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={markAllAsRead}
              className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mark all as read
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationsModal;