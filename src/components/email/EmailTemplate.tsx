import React, { useState } from 'react';
import { Copy, Mail, Check } from 'lucide-react';

interface EmailTemplateProps {
  isDark: boolean;
  type: 'rejection' | 'call' | 'info' | 'investors';
  founders: {
    name: string;
    email?: string;
  }[];
  company: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ isDark, type, founders, company }) => {
  const [copied, setCopied] = useState(false);
  const [emailContent, setEmailContent] = useState(() => getEmailTemplate(type, founders[0]?.name, company));

  function getEmailTemplate(type: string, founderName: string, company: string) {
    const templates = {
      rejection: {
        subject: `Re: ${company} - Investment Decision`,
        body: `Dear ${founderName},

Thank you for sharing your pitch deck and giving us the opportunity to learn about ${company}. We've thoroughly reviewed your materials and had several internal discussions about the opportunity.

While we're impressed with what you and your team have built, we don't feel we're the right investment partner for ${company} at this time. This decision is primarily based on our current investment focus and portfolio composition, rather than any specific concerns about your business.

We appreciate the time you've spent sharing your vision with us and wish you great success in your future endeavors.

Best regards,`
      },
      call: {
        subject: `Re: ${company} - Follow-up Discussion`,
        body: `Hi ${founderName},

I hope this email finds you well. Thank you for sharing your pitch deck for ${company}. We've reviewed the materials and would love to schedule a call to discuss further.

Would you be available for a 45-minute video call next week? Here are a few potential time slots (all times in EST):
- Tuesday at 2:00 PM
- Wednesday at 11:00 AM
- Thursday at 4:00 PM

Please let me know which time works best for you, or suggest alternative times if none of these work.

Looking forward to our conversation.

Best regards,`
      },
      info: {
        subject: `Re: ${company} - Additional Information Request`,
        body: `Hi ${founderName},

Thank you for sharing your pitch deck for ${company}. We're intrigued by your vision and would like to learn more about a few specific areas:

1. Customer Metrics
   - Current MRR/ARR breakdown
   - Customer acquisition costs (CAC)
   - Lifetime value (LTV) data

2. Market Strategy
   - Go-to-market strategy for the next 12-18 months
   - Key partnerships in pipeline

3. Financial Projections
   - Detailed unit economics
   - Use of funds breakdown
   - Monthly burn rate

Could you please provide these details at your earliest convenience?

Best regards,`
      },
      investors: {
        subject: `Re: ${company} - Investment Syndicate`,
        body: `Hi ${founderName},

I hope this email finds you well. We've been reviewing ${company}'s pitch deck and would like to introduce you to a few potential co-investors who might be interested in participating in this round.

Before making the introductions, I wanted to:
1. Confirm you're open to meeting additional investors
2. Verify how much allocation is still available
3. Understand if you have any specific preferences regarding investor profiles

Please let me know your thoughts, and I'll be happy to make the relevant introductions.

Best regards,`
      }
    };

    return templates[type as keyof typeof templates] || templates.info;
  }

  const handleCopy = async () => {
    const fullEmail = `To: ${founders.map(f => f.email).join(', ')}
Subject: ${emailContent.subject}

${emailContent.body}`;

    await navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${founders.map(f => f.email).join(',')}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className={`rounded-lg border ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-3">
          <div>
            <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              To:
            </label>
            <div className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {founders.map(f => f.email).join(', ')}
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
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <textarea
          value={emailContent.body}
          onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
          rows={12}
          className={`w-full p-2 rounded border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-gray-100' 
              : 'bg-gray-50 border-gray-200 text-gray-900'
          }`}
        />
      </div>

      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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

export default EmailTemplate;