import React, { useState } from 'react';
import { X, Copy, Mail, Check } from 'lucide-react';
import type { FileData } from '../../App';

interface BookCallModalProps {
  isDark: boolean;
  onClose: () => void;
  dealData: FileData;
}

const BookCallModal: React.FC<BookCallModalProps> = ({ isDark, onClose, dealData }) => {
  const [copied, setCopied] = useState(false);
  const [emailContent, setEmailContent] = useState({
    subject: `Re: ${dealData.company} - Follow-up Discussion`,
    body: `Hi ${dealData.founders[0]?.name},

I've reviewed your pitch deck for ${dealData.company} and would like to schedule a call to discuss further. Would you be available for a 45-minute video call next week? Here are some potential time slots (EST):

• Tuesday at 2:00 PM
• Wednesday at 11:00 AM
• Thursday at 4:00 PM

Best regards,
Sarah`
  });

  const handleCopy = async () => {
    const fullEmail = `To: ${dealData.founders.map(f => f.email).join(', ')}
Subject: ${emailContent.subject}

${emailContent.body}`;

    await navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${dealData.founders.map(f => f.email).join(',')}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className={`relative w-full max-w-lg rounded-xl shadow-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Schedule a Call
          </h2>
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
        <div className="p-4">
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                To:
              </label>
              <div className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {dealData.founders.map(f => f.email).join(', ')}
              </div>
            </div>
            
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Subject:
              </label>
              <input
                type="text"
                value={emailContent.subject}
                onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                className={`mt-1 w-full px-2 py-1 rounded border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-gray-100' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>

            <div>
              <textarea
                value={emailContent.body}
                onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                rows={8}
                className={`w-full p-3 rounded-lg border resize-none ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-gray-100' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
          
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Mail size={18} />
            <span>Open in Email Client</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCallModal;