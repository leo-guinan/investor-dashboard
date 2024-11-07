import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2, ZoomIn, ZoomOut, MessageSquare, ThumbsUp, AlertCircle, ThumbsDown } from 'lucide-react';
import type { FileData } from '../../App';

interface PitchDeckModalProps {
  isDark: boolean;
  onClose: () => void;
  fileData: FileData;
}

// Mock pitch deck pages
const mockPages = [
  { id: 1, title: 'Cover', content: 'RentFlow: Revolutionizing Property Management' },
  { id: 2, title: 'Problem', content: 'The rental market lacks efficiency and transparency' },
  { id: 3, title: 'Solution', content: 'AI-driven platform for seamless property management' },
  { id: 4, title: 'Market Size', content: '$40B Total Addressable Market' },
  { id: 5, title: 'Business Model', content: 'SaaS + Transaction Fees' },
  { id: 6, title: 'Traction', content: '1,500+ properties managed, $2.5M ARR' },
  { id: 7, title: 'Competition', content: 'Competitive landscape analysis' },
  { id: 8, title: 'Team', content: 'Experienced founders from Airbnb and Google' },
  { id: 9, title: 'Financials', content: 'Revenue projections and unit economics' },
  { id: 10, title: 'Ask', content: 'Raising $10M Series A' }
];

const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isDark, onClose, fileData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Array<{ page: number; text: string }>>([]);
  const [newComment, setNewComment] = useState('');

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < mockPages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { page: currentPage, text: newComment }]);
      setNewComment('');
    }
  };

  const handleClose = () => {
    if (!recommendation) {
      setShowExitPrompt(true);
    } else {
      onClose();
    }
  };

  const handleRecommendation = (choice: string) => {
    setRecommendation(choice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-5xl h-[80vh] rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1.5 rounded-lg ${
              fileData.metrics.vcMatch >= 85
                ? 'bg-green-500/20 text-green-500'
                : fileData.metrics.vcMatch >= 70
                  ? 'bg-yellow-500/20 text-yellow-500'
                  : 'bg-red-500/20 text-red-500'
            }`}>
              <div className="flex items-center gap-2">
                {fileData.metrics.vcMatch >= 85 ? (
                  <ThumbsUp size={16} />
                ) : fileData.metrics.vcMatch >= 70 ? (
                  <AlertCircle size={16} />
                ) : (
                  <ThumbsDown size={16} />
                )}
                <span className="text-sm font-medium">
                  {fileData.metrics.vcMatch >= 85
                    ? 'Strong Match'
                    : fileData.metrics.vcMatch >= 70
                      ? 'Potential Match'
                      : 'Not a Match'
                  } ({fileData.metrics.vcMatch}%)
                </span>
              </div>
            </div>
            
            <div className="text-white">
              <h2 className="text-lg font-semibold">{fileData.company}</h2>
              <p className="text-sm opacity-75">{fileData.funding}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <MessageSquare size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={() => {}} // Handle share
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={() => {}} // Handle download
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full pt-20 pb-16 flex">
          {/* Navigation */}
          <div className={`w-64 border-r overflow-y-auto ${
            isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            {mockPages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  currentPage === page.id
                    ? isDark
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-900'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-sm font-medium">Page {page.id}</div>
                <div className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {page.title}
                </div>
              </button>
            ))}
          </div>

          {/* Pitch Deck Page */}
          <div className="flex-1 relative">
            <div
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ transform: `scale(${zoom})` }}
            >
              <div className={`w-full h-full rounded-lg border ${
                isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {mockPages[currentPage - 1].title}
                  </h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {mockPages[currentPage - 1].content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Panel */}
          {showComments && (
            <div className={`w-80 border-l ${
              isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Comments
                </h3>
                <div className="space-y-4">
                  {comments.filter(c => c.page === currentPage).map((comment, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-gray-700' : 'bg-white'
                      }`}
                    >
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {comment.text}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className={`flex-1 px-3 py-2 rounded-lg border ${
                        isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="text-white">
            Page {currentPage} of {mockPages.length}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === mockPages.length}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </motion.div>

      {/* Exit Prompt */}
      {showExitPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-md rounded-xl p-6 ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              What's your recommendation?
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleRecommendation('proceed')}
                className="w-full px-4 py-3 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
              >
                Proceed with Deal
              </button>
              <button
                onClick={() => handleRecommendation('more-conviction')}
                className="w-full px-4 py-3 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
              >
                Need More Conviction
              </button>
              <button
                onClick={() => handleRecommendation('not-fundable')}
                className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
              >
                Not Yet Fundable
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PitchDeckModal;