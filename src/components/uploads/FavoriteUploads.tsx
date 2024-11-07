import React, { useState } from 'react';
import { Star, Plus, ChevronDown } from 'lucide-react';
import CircularProgress from '../CircularProgress';
import type { FileData } from '../../App';

interface FavoriteUploadsProps {
  isDark: boolean;
  onFileSelect: (file: FileData) => void;
  selectedFile: FileData;
}

// Mock favorite files
const mockFavorites: FileData[] = [
  {
    name: 'CloudScale AI Pitch.pdf',
    date: '2024-03-14',
    match: 92,
    industry: 'AI',
    company: 'CloudScale',
    funding: '$5M Seed',
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
    match: 88,
    industry: 'CleanTech',
    company: 'GreenEnergy',
    funding: '$15M Series A',
    metrics: {
      market: 85,
      team: 90,
      vcMatch: 88,
      product: 82,
      traction: 75
    }
  }
];

const FavoriteUploads: React.FC<FavoriteUploadsProps> = ({ isDark, onFileSelect, selectedFile }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  function getMetricColor(value: number) {
    if (value >= 90) return 'rgb(34 197 94)';
    if (value >= 70) return 'rgb(234 179 8)';
    if (value >= 50) return 'rgb(249 115 22)';
    return 'rgb(239 68 68)';
  }

  const FileItem = ({ file }: { file: FileData }) => (
    <button
      onClick={() => onFileSelect(file)}
      className={`w-full text-left px-4 py-3 hover:bg-gray-800 group ${
        isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
      } ${selectedFile.name === file.name ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <CircularProgress
            value={file.metrics.vcMatch}
            color={getMetricColor(file.metrics.vcMatch)}
            size={32}
            isDark={isDark}
          />
          <span className="text-sm truncate">{file.name}</span>
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
    <div>
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-yellow-500" />
          <h3 className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Favorite Uploads
          </h3>
        </div>
        <button 
          onClick={() => setShowFavorites(!showFavorites)}
          className={`p-1 rounded-md hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {showFavorites ? <ChevronDown size={16} /> : <Plus size={16} />}
        </button>
      </div>
      
      {showFavorites && (
        <div className="mt-2">
          {mockFavorites.length > 0 ? (
            mockFavorites.map((file) => (
              <FileItem key={file.name} file={file} />
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No favorite deals yet. Mark deals as favorite from the Search Deals section.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteUploads;