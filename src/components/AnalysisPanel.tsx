import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronRight, Mail, Calendar, Users, Info, Share2, Lightbulb, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import CircularProgress from './CircularProgress';
import type { FileData } from '../App';
import ShareDealModal from './share/ShareDealModal';
import InviteInvestorsModal from './share/InviteInvestorsModal';
import GetMoreInfoModal from './share/GetMoreInfoModal';
import BookCallModal from './share/BookCallModal';
import RejectDealModal from './share/RejectDealModal';
import PitchDeckModal from './pdf/PitchDeckModal';

interface AnalysisPanelProps {
  isDark: boolean;
  fileData: FileData;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ isDark, fileData }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('recommendation');
  const [expandedSubSection, setExpandedSubSection] = useState<string | null>(null);
  const [showMetricsLegend, setShowMetricsLegend] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showGetInfoModal, setShowGetInfoModal] = useState(false);
  const [showBookCallModal, setShowBookCallModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPitchDeck, setShowPitchDeck] = useState(false);

  function getMetricColor(value: number) {
    if (value >= 90) return 'rgb(34 197 94)';
    if (value >= 70) return 'rgb(234 179 8)';
    if (value >= 50) return 'rgb(249 115 22)';
    return 'rgb(239 68 68)';
  }

  const getRecommendationStatus = (vcMatch: number) => {
    if (vcMatch >= 85) return { text: 'Proceed with Deal', icon: <ThumbsUp className="text-green-500" size={20} />, color: 'text-green-500' };
    if (vcMatch >= 75) return { text: 'Request more info', icon: <ThumbsUp className="text-yellow-500" size={20} />, color: 'text-yellow-500' };
    return { text: 'Not Fundable', icon: <ThumbsDown className="text-red-500" size={20} />, color: 'text-red-500' };
  };

  const metrics = [
    { label: 'VC MATCH', value: fileData.metrics.vcMatch, color: getMetricColor(fileData.metrics.vcMatch) },
    { label: 'MARKET', value: fileData.metrics.market, color: getMetricColor(fileData.metrics.market) },
    { label: 'TEAM', value: fileData.metrics.team, color: getMetricColor(fileData.metrics.team) },
    { label: 'PRODUCT', value: fileData.metrics.product, color: getMetricColor(fileData.metrics.product) },
    { label: 'TRACTION', value: fileData.metrics.traction, color: getMetricColor(fileData.metrics.traction) }
  ];

  const sections = [
    {
      id: 'recommendation',
      title: 'Recommendation',
      icon: <Lightbulb className="text-amber-500" size={16} />,
      content: (
        <div className="space-y-4">
          <button
            onClick={() => setShowPitchDeck(true)}
            className={`text-lg font-semibold transition-colors hover:text-indigo-500 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {fileData.company}
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="flex items-center gap-2">
            {getRecommendationStatus(fileData.metrics.vcMatch).icon}
            <span className={`font-medium ${getRecommendationStatus(fileData.metrics.vcMatch).color}`}>
              {getRecommendationStatus(fileData.metrics.vcMatch).text}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {fileData.funding}
          </div>
          <button
            onClick={() => setShowNextSteps(!showNextSteps)}
            className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {showNextSteps ? 'Hide' : 'Show'} Next Steps
            {showNextSteps ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {showNextSteps && (
            <div className="space-y-2 pl-2">
              <button
                onClick={() => setShowBookCallModal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Calendar size={16} /> Book a Call
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Mail size={16} /> Rejection Email
              </button>
              <button
                onClick={() => setShowGetInfoModal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Info size={16} /> Get more info
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Users size={16} /> Invite Investors
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Share2 size={16} /> Share this Deal
              </button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'metrics',
      title: 'Fundability Metrics',
      icon: <Lightbulb className="text-emerald-500" size={16} />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="mx-auto mb-2">
                  <CircularProgress
                    value={metric.value}
                    color={metric.color}
                    isDark={isDark}
                  />
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowMetricsLegend(!showMetricsLegend)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Learn More
          </button>
          {showMetricsLegend && (
            <div className="text-sm space-y-2 pl-2">
              <p className="text-green-500">85+ proceed with the deal</p>
              <p className="text-yellow-500">75 - 84 need more conviction</p>
              <p className="text-red-500">74 or less is not yet fundable</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'pitch-deck',
      title: 'Pitch Deck Summary',
      icon: <Lightbulb className="text-purple-500" size={16} />,
      subsections: [
        {
          id: 'executive-summary',
          title: 'Executive Summary',
          content: `${fileData.company} is revolutionizing the PropTech industry with an AI-driven platform that streamlines rental property management. The platform automates tenant screening, rent collection, and maintenance requests while providing real-time analytics for property owners.`
        },
        {
          id: 'current-traction',
          title: 'Current Traction',
          content: '• 1,500+ properties managed\n• $2.5M ARR\n• 125% YoY growth\n• 15 enterprise clients\n• 4.8/5 customer satisfaction'
        }
      ]
    },
    {
      id: 'investor-concerns',
      title: 'Investor Concerns',
      icon: <Lightbulb className="text-rose-500" size={16} />,
      subsections: [
        {
          id: 'market-concerns',
          title: 'Market Concerns',
          content: '• High competition in PropTech space\n• Market saturation risks\n• Regulatory challenges'
        },
        {
          id: 'product-concerns',
          title: 'Product Concerns',
          content: '• Integration complexity\n• Security considerations\n• Scalability challenges'
        }
      ]
    },
    {
      id: 'founding-team',
      title: 'Founding Team',
      icon: <Lightbulb className="text-blue-500" size={16} />,
      content: (
        <div className="space-y-4">
          {fileData.founders.map((founder, index) => (
            <div key={index} className="space-y-1">
              <div className="font-medium">{founder.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {founder.role} • {founder.background}
              </div>
              <div className="flex gap-3">
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <Mail size={16} />
                  </a>
                )}
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${founder.linkedin ? 'text-indigo-600 dark:text-indigo-400 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                  >
                    <Linkedin size={16} />
                  </a>
                )}
                {founder.twitter && (
                  <a
                    href={founder.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${founder.twitter ? 'text-indigo-600 dark:text-indigo-400 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
                  >
                    <Twitter size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className={`w-80 border-l overflow-y-auto ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <div className="p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span>{section.title}</span>
              </div>
              {expandedSection === section.id ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="mt-2 space-y-2">
                {section.content && (
                  <div className={`p-3 rounded-md ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {section.content}
                  </div>
                )}

                {section.subsections?.map((subsection) => (
                  <div key={subsection.id}>
                    <button
                      onClick={() => setExpandedSubSection(expandedSubSection === subsection.id ? null : subsection.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-md ${
                        isDark 
                          ? 'text-gray-400 hover:bg-gray-800' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">{subsection.title}</span>
                      {expandedSubSection === subsection.id ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </button>

                    {expandedSubSection === subsection.id && (
                      <div className={`mt-2 ml-4 p-3 text-sm rounded-md ${
                        isDark 
                          ? 'bg-gray-800 text-gray-300' 
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        <pre className="whitespace-pre-wrap font-sans">
                          {subsection.content}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showPitchDeck && (
        <PitchDeckModal
          isDark={isDark}
          onClose={() => setShowPitchDeck(false)}
          fileData={fileData}
        />
      )}

      {showShareModal && (
        <ShareDealModal
          isDark={isDark}
          onClose={() => setShowShareModal(false)}
          dealData={fileData}
        />
      )}

      {showInviteModal && (
        <InviteInvestorsModal
          isDark={isDark}
          onClose={() => setShowInviteModal(false)}
          dealData={fileData}
        />
      )}

      {showGetInfoModal && (
        <GetMoreInfoModal
          isDark={isDark}
          onClose={() => setShowGetInfoModal(false)}
          dealData={fileData}
        />
      )}

      {showBookCallModal && (
        <BookCallModal
          isDark={isDark}
          onClose={() => setShowBookCallModal(false)}
          dealData={fileData}
        />
      )}

      {showRejectModal && (
        <RejectDealModal
          isDark={isDark}
          onClose={() => setShowRejectModal(false)}
          dealData={fileData}
        />
      )}
    </div>
  );
};

export default AnalysisPanel;