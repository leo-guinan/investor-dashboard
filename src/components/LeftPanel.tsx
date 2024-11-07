import React, { useState, useCallback } from 'react';
import { Upload, Link, Search, MessageSquare, Plus, ChevronDown, Clock, Star } from 'lucide-react';
import CircularProgress from './CircularProgress';
import UserProfile from './UserProfile';
import QuickActions from './chat/QuickActions';
import UploadModal from './upload/UploadModal';
import ShareLinkModal from './share/ShareLinkModal';
import FavoriteUploads from './uploads/FavoriteUploads';
import Tooltip from './Tooltip';
import type { FileData } from '../App';

interface LeftPanelProps {
  isDark: boolean;
  onFileSelect: (file: FileData) => void;
  selectedFile: FileData;
  onSendMessage?: (message: string) => void;
  onShowSettings?: () => void;
}

// Mock data for recent uploads
const mockFiles: FileData[] = [
  {
    name: 'RentFlow Pitch.pdf',
    date: '2024-03-15',
    match: 85,
    industry: 'PropTech',
    company: 'RentFlow',
    funding: '$10M Series A',
    favorite: false,
    founders: [
      {
        name: 'Sarah Chen',
        role: 'CEO',
        background: 'Ex-Airbnb, Stanford CS',
        email: 'sarah@rentflow.com',
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen'
      },
      {
        name: 'Michael Rodriguez',
        role: 'CTO',
        background: 'Ex-Google, MIT AI Lab',
        email: 'michael@rentflow.com',
        linkedin: 'https://linkedin.com/in/michaelrodriguez'
      }
    ],
    metrics: {
      market: 65,
      team: 70,
      vcMatch: 85,
      product: 70,
      traction: 20
    }
  },
  {
    name: 'CloudScale AI Pitch.pdf',
    date: '2024-03-14',
    match: 92,
    industry: 'AI/ML',
    company: 'CloudScale',
    funding: '$5M Seed',
    favorite: true,
    founders: [
      {
        name: 'Alex Thompson',
        role: 'CEO',
        background: 'Ex-Google, Stanford AI',
        email: 'alex@cloudscale.ai'
      }
    ],
    metrics: {
      market: 88,
      team: 95,
      vcMatch: 92,
      product: 85,
      traction: 78
    }
  },
  {
    name: 'GreenEnergy Solutions.pdf',
    date: '2024-03-13',
    match: 78,
    industry: 'CleanTech',
    company: 'GreenEnergy',
    funding: '$15M Series A',
    favorite: false,
    founders: [
      {
        name: 'David Kim',
        role: 'CEO',
        background: 'Ex-Tesla, MIT',
        email: 'david@greenenergy.com'
      }
    ],
    metrics: {
      market: 85,
      team: 90,
      vcMatch: 78,
      product: 82,
      traction: 75
    }
  }
];

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  isDark, 
  onFileSelect, 
  selectedFile, 
  onSendMessage,
  onShowSettings 
}) => {
  const [showRecentFiles, setShowRecentFiles] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [files, setFiles] = useState(mockFiles);

  const handleFileUpload = useCallback((file: File) => {
    console.log('File uploaded:', file);
  }, []);

  function getMetricColor(value: number) {
    if (value >= 90) return 'rgb(34 197 94)';
    if (value >= 70) return 'rgb(234 179 8)';
    if (value >= 50) return 'rgb(249 115 22)';
    return 'rgb(239 68 68)';
  }

  const toggleFavorite = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    setFiles(files.map(file => 
      file.name === fileName ? { ...file, favorite: !file.favorite } : file
    ));
  };

  const FileItem = ({ file }: { file: FileData }) => (
    <button
      onClick={() => onFileSelect(file)}
      className={`w-full text-left px-4 py-3 hover:bg-gray-800 group ${
        isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
      } ${selectedFile.name === file.name ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CircularProgress
              value={file.metrics.vcMatch}
              color={getMetricColor(file.metrics.vcMatch)}
              size={32}
              isDark={isDark}
            />
            <span className="text-sm truncate">{file.name}</span>
          </div>
          <Tooltip content="Favorite" isDark={isDark}>
            <button
              onClick={(e) => toggleFavorite(e, file.name)}
              className={`p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100`}
            >
              <Star
                size={16}
                className={file.favorite ? 'text-yellow-500 fill-yellow-500' : isDark ? 'text-gray-600' : 'text-gray-400'}
              />
            </button>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{file.date}</span>
          <span>•</span>
          <span>{file.industry}</span>
          <span>•</span>
          <span>{file.funding}</span>
        </div>
      </div>
    </button>
  );

  return (
    <div className={`w-72 border-r overflow-y-auto ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <UserProfile 
        isDark={isDark} 
        onShowSettings={onShowSettings}
      />
      
      <div className="border-b border-gray-700" />

      <div className="p-4">
        <div className="space-y-3">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="w-full flex items-center justify-start gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Upload size={18} />
            <span className="font-medium">Upload Pitch Deck</span>
          </button>
          
          <button 
            onClick={() => setShowShareModal(true)}
            className="w-full flex items-center justify-start gap-2 px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Link size={18} />
            <span>Share My Link</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-700" />

      <div className="mt-6 space-y-6">
        <QuickActions isDark={isDark} onSendMessage={onSendMessage} />

        <div className="border-b border-gray-700" />

        {/* Recent Uploads Section */}
        <div>
          <div className="px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              <h3 className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Recent Uploads
              </h3>
            </div>
            <button 
              onClick={() => setShowRecentFiles(!showRecentFiles)}
              className={`p-1 rounded-md hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {showRecentFiles ? <ChevronDown size={16} /> : <Plus size={16} />}
            </button>
          </div>
          
          {showRecentFiles && (
            <div className="mt-2">
              {files.map((file) => (
                <FileItem key={file.name} file={file} />
              ))}
            </div>
          )}
        </div>

        <div className="border-b border-gray-700" />

        {/* Favorite Uploads Section */}
        <FavoriteUploads
          isDark={isDark}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      </div>

      {showUploadModal && (
        <UploadModal
          isDark={isDark}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
        />
      )}

      {showShareModal && (
        <ShareLinkModal
          isDark={isDark}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default LeftPanel;