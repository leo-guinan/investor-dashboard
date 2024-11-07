import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Pencil, Check, X } from 'lucide-react';

interface MessageProps {
  id: string;
  type: 'user' | 'ai';
  content: string;
  feedback?: 'helpful' | 'not-helpful';
  isDark: boolean;
  isLastUserMessage?: boolean;
  onFeedback: (messageId: string, feedback: 'helpful' | 'not-helpful') => void;
  onEdit?: (messageId: string, newContent: string) => void;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const Message: React.FC<MessageProps> = ({
  id,
  type,
  content,
  feedback,
  isDark,
  isLastUserMessage,
  onFeedback,
  onEdit,
  user
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(type === 'ai');

  useEffect(() => {
    if (type === 'ai' && isTyping) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= content.length) {
          setDisplayedContent(content.slice(0, index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 20); // Adjust speed as needed

      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, type]);

  const handleSave = () => {
    if (editedContent.trim() && onEdit) {
      onEdit(id, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className={`flex gap-4 mb-6 ${type === 'user' ? 'justify-end' : ''}`}>
      {type === 'ai' && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          AI
        </div>
      )}
      
      <div className={`relative flex-1 group ${
        type === 'ai' 
          ? `${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} rounded-2xl rounded-tl-none`
          : `${isDark ? 'bg-indigo-600' : 'bg-indigo-500'} text-white rounded-2xl rounded-br-none`
      } p-4 shadow-sm max-w-2xl ${type === 'user' ? 'ml-12' : ''}`}>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={`w-full p-2 rounded-md resize-none focus:outline-none focus:ring-2 ${
                isDark 
                  ? 'bg-gray-700 text-white focus:ring-indigo-500' 
                  : 'bg-white text-gray-900 focus:ring-indigo-400'
              }`}
              rows={3}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-md hover:bg-gray-700/50"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleSave}
                className="p-1.5 rounded-md hover:bg-gray-700/50"
              >
                <Check size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap">{type === 'ai' ? displayedContent : content}</p>
            
            {type === 'ai' ? (
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onFeedback(id, 'helpful')}
                  className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                    feedback === 'helpful' ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <ThumbsUp size={14} />
                </button>
                <button
                  onClick={() => onFeedback(id, 'not-helpful')}
                  className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                    feedback === 'not-helpful' ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <ThumbsDown size={14} />
                </button>
              </div>
            ) : isLastUserMessage && (
              <button
                onClick={() => setIsEditing(true)}
                className={`absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 
                  transition-all duration-200 ${
                  isDark 
                    ? 'hover:bg-gray-700/50 text-gray-300' 
                    : 'hover:bg-gray-100/50 text-white'
                }`}
                title="Edit message"
              >
                <Pencil size={14} />
              </button>
            )}
          </>
        )}
      </div>
      
      {type === 'user' && (
        user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        )
      )}
    </div>
  );
};

export default Message;