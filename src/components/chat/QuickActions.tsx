import React, { useState } from 'react';
import { MessageSquare, ChevronDown, Plus, Zap } from 'lucide-react';

interface QuickActionsProps {
  isDark: boolean;
  onSendMessage?: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ isDark, onSendMessage }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [expandedSubAction, setExpandedSubAction] = useState<string | null>(null);

  const handleSocialMediaClick = () => {
    if (onSendMessage) {
      onSendMessage(`**Social Media**\n\nSarah Chen (CEO)\nLinkedIn: linkedin.com/in/sarahchen\nTwitter: @sarahchen\n\nMichael Rodriguez (CTO)\nLinkedIn: linkedin.com/in/michaelrodriguez`);
    }
  };

  const actions = [
    {
      id: 'due-diligence',
      label: 'Due Diligence',
      icon: <MessageSquare size={16} className="mr-2" />,
      subActions: [
        {
          id: 'research-founders',
          label: 'Research Founders',
          subActions: [
            { id: 'social-media', label: 'Social Media', onClick: handleSocialMediaClick },
            { id: 'bio-summary', label: 'Bio & Summary' },
            { id: 'domain-expertise', label: 'Domain Expertise' },
            { id: 'founder-ratings', label: 'Founder Ratings' },
            { id: 'founder-chat', label: 'Founder Chat' }
          ]
        },
        {
          id: 'list-competitors',
          label: 'List Competitors',
          subActions: [
            { id: 'competitor-matrix', label: 'Competitor Matrix' },
            { id: 'key-differentiator', label: 'Key Differentiator' },
            { id: 'competitor-fundraises', label: 'Competitor Fundraises' },
            { id: 'competitor-market-share', label: 'Competitor Market Share' },
            { id: 'competitor-prices', label: 'Competitor Prices' },
            { id: 'target-market', label: 'Target Market' }
          ]
        },
        {
          id: 'share-concerns',
          label: 'Share Concerns',
          subActions: [
            { id: 'traction-concerns', label: 'Traction Concerns' },
            { id: 'market-size-concerns', label: 'Market Size Concerns' },
            { id: 'team-concerns', label: 'Team Concerns' },
            { id: 'moat-concerns', label: 'Moat Concerns' },
            { id: 'regulatory-concerns', label: 'Regulatory Concerns' }
          ]
        }
      ]
    },
    {
      id: 'housekeeping',
      label: 'Housekeeping',
      icon: <MessageSquare size={16} className="mr-2" />,
      subActions: [
        {
          id: 'email-founders',
          label: 'Email Founders',
          subActions: [
            { id: 'rejection-email', label: 'Rejection Email' },
            { id: 'book-call', label: 'Book a Call' },
            { id: 'invite-coinvestors', label: 'Invite Co-investors' },
            { id: 'request-info', label: 'Request more info' }
          ]
        },
        {
          id: 'generate-deal-memo',
          label: 'Generate Deal Memo',
          subActions: [
            { id: 'deal-memo-template', label: 'Deal Memo Template' },
            { id: 'generate-memo', label: 'Generate Deal Memo' },
            { id: 'standard-term-sheet', label: 'Standard Term Sheet' }
          ]
        }
      ]
    },
    {
      id: 'interview-prep',
      label: 'Interview Prep',
      icon: <MessageSquare size={16} className="mr-2" />,
      subActions: [
        {
          id: 'ask-questions',
          label: 'Ask Questions',
          subActions: [
            { id: 'competition-questions', label: 'Competition Questions' },
            { id: 'gtm-questions', label: 'GTM Questions' },
            { id: 'traction-questions', label: 'Traction Questions' },
            { id: 'team-questions', label: 'Team Questions' },
            { id: 'moat-questions', label: 'Moat Questions' }
          ]
        },
        {
          id: 'uncover-concerns',
          label: 'Uncover Concerns',
          subActions: [
            { id: 'traction-concerns', label: 'Traction Concerns' },
            { id: 'market-size-concerns', label: 'Market Size Concerns' },
            { id: 'team-concerns', label: 'Team Concerns' },
            { id: 'moat-concerns', label: 'Moat Concerns' },
            { id: 'regulatory-concerns', label: 'Regulatory Concerns' }
          ]
        }
      ]
    }
  ];

  return (
    <div>
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          <h3 className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Quick Actions
          </h3>
        </div>
        <button 
          onClick={() => setShowQuickActions(!showQuickActions)}
          className={`p-1 rounded-md hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {showQuickActions ? <ChevronDown size={16} /> : <Plus size={16} />}
        </button>
      </div>

      {showQuickActions && (
        <div className="mt-2">
          {actions.map((action) => (
            <div key={action.id} className="mb-1">
              <button
                onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}
                className={`w-full flex items-center px-6 py-2.5 text-sm ${
                  isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                } ${expandedAction === action.id ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
              >
                {action.icon}
                <span>{action.label}</span>
                {expandedAction === action.id ? <ChevronDown size={14} className="ml-auto" /> : <Plus size={14} className="ml-auto" />}
              </button>

              {expandedAction === action.id && (
                <div className="ml-8 border-l border-gray-700">
                  {action.subActions.map((subAction) => (
                    <div key={subAction.id} className="relative">
                      <button
                        onClick={() => setExpandedSubAction(expandedSubAction === subAction.id ? null : subAction.id)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm ${
                          isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <span>{subAction.label}</span>
                        {subAction.subActions && (
                          expandedSubAction === subAction.id ? <ChevronDown size={14} /> : <Plus size={14} />
                        )}
                      </button>

                      {expandedSubAction === subAction.id && subAction.subActions && (
                        <div className="ml-4 border-l border-gray-700">
                          {subAction.subActions.map((item) => (
                            <button
                              key={item.id}
                              onClick={item.onClick}
                              className={`w-full text-left px-4 py-2 text-sm ${
                                isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickActions;