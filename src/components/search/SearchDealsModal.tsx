import React, { useState } from 'react';
import { X, Search, ChevronUp, ChevronDown, Star } from 'lucide-react';
import CircularProgress from '../CircularProgress';

interface SearchDealsModalProps {
  isDark: boolean;
  onClose: () => void;
}

interface Deal {
  id: string;
  match: number;
  uploaded: string;
  company: string;
  raising: string;
  stage: string;
  founders: string[];
  industry: string;
  favorite: boolean;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    match: 85,
    uploaded: '2024-03-15',
    company: 'RentFlow',
    raising: '$10M',
    stage: 'Series A',
    founders: ['Sarah Chen', 'Michael Rodriguez'],
    industry: 'PropTech',
    favorite: false
  },
  {
    id: '2',
    match: 92,
    uploaded: '2024-03-14',
    company: 'CloudScale AI',
    raising: '$5M',
    stage: 'Seed',
    founders: ['Alex Thompson', 'Maria Garcia'],
    industry: 'AI/ML',
    favorite: true
  },
  {
    id: '3',
    match: 78,
    uploaded: '2024-03-13',
    company: 'GreenEnergy Solutions',
    raising: '$15M',
    stage: 'Series A',
    founders: ['David Kim', 'Lisa Chen'],
    industry: 'CleanTech',
    favorite: false
  }
];

const SearchDealsModal: React.FC<SearchDealsModalProps> = ({ isDark, onClose }) => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Deal>('match');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Deal) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter deals based on search query
    // This would typically be handled by your backend
  };

  const toggleFavorite = (dealId: string) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, favorite: !deal.favorite } : deal
    ));
  };

  const sortedDeals = [...deals].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className={`relative w-full max-w-6xl rounded-xl shadow-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Search Deals
            </h2>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Search size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search deals..."
                className={`bg-transparent border-none focus:outline-none text-sm ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                {[
                  { key: 'match', label: 'Match' },
                  { key: 'uploaded', label: 'Uploaded' },
                  { key: 'company', label: 'Company' },
                  { key: 'raising', label: 'Raising' },
                  { key: 'stage', label: 'Stage' },
                  { key: 'founders', label: 'Founders' },
                  { key: 'industry', label: 'Industry' },
                  { key: 'favorite', label: 'Favorites' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className={`px-4 py-3 text-left text-xs font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    } cursor-pointer select-none`}
                    onClick={() => handleSort(key as keyof Deal)}
                  >
                    <div className="flex items-center gap-1">
                      <span>{label}</span>
                      {sortField === key && (
                        sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className={`${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-4 py-3">
                    <CircularProgress
                      value={deal.match}
                      color={
                        deal.match >= 90 ? 'rgb(34 197 94)' :
                        deal.match >= 70 ? 'rgb(234 179 8)' :
                        deal.match >= 50 ? 'rgb(249 115 22)' :
                        'rgb(239 68 68)'
                      }
                      size={32}
                      isDark={isDark}
                    />
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {new Date(deal.uploaded).toLocaleDateString()}
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {deal.company}
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {deal.raising}
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {deal.stage}
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="truncate max-w-[200px]">
                      {deal.founders.join(', ')}
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {deal.industry}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFavorite(deal.id)}
                      className={`p-1 rounded-full transition-colors ${
                        deal.favorite
                          ? 'text-yellow-500'
                          : isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Star size={18} fill={deal.favorite ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchDealsModal;