import React, { useState } from 'react';
import { ChevronLeft, Search, Sliders, ThumbsUp, ThumbsDown, Mail, Star } from 'lucide-react';
import FilterBar from './FilterBar';
import CircularProgress from '../CircularProgress';
import DealSummaryModal from './DealSummaryModal';

interface SearchDealsPageProps {
  isDark: boolean;
  onBack: () => void;
}

// Extended mock data
const mockDeals = [
  {
    id: '1',
    match: 92,
    uploaded: '2024-03-14',
    company: 'CloudScale AI',
    raising: '$5M',
    stage: 'Seed',
    founders: 'Alex Thompson, Maria Garcia',
    industry: 'AI/ML',
    email: 'alex@cloudscale.ai',
    prelovcStatus: 'proceed',
    investorStatus: 'proceed',
    favorite: true,
    oneliner: 'Enterprise-grade AI infrastructure scaling solution',
    metrics: {
      market: 88,
      team: 95,
      vcMatch: 92,
      product: 85,
      traction: 78
    }
  },
  {
    id: '2',
    match: 85,
    uploaded: '2024-03-15',
    company: 'RentFlow',
    raising: '$10M',
    stage: 'Series A',
    founders: 'Sarah Chen, Michael Rodriguez',
    industry: 'PropTech',
    email: 'sarah@rentflow.com',
    prelovcStatus: 'proceed',
    investorStatus: 'not-reviewed',
    favorite: false,
    oneliner: 'AI-powered property management platform revolutionizing rental markets',
    metrics: {
      market: 65,
      team: 70,
      vcMatch: 85,
      product: 70,
      traction: 20
    }
  },
  {
    id: '3',
    match: 78,
    uploaded: '2024-03-13',
    company: 'GreenEnergy Solutions',
    raising: '$15M',
    stage: 'Series A',
    founders: 'David Kim, Lisa Chen',
    industry: 'CleanTech',
    email: 'david@greenenergy.com',
    prelovcStatus: 'conviction',
    investorStatus: 'conviction',
    favorite: false,
    oneliner: 'Renewable energy solutions for sustainable future',
    metrics: {
      market: 85,
      team: 90,
      vcMatch: 78,
      product: 82,
      traction: 75
    }
  },
  {
    id: '4',
    match: 95,
    uploaded: '2024-03-12',
    company: 'HealthTech AI',
    raising: '$8M',
    stage: 'Seed',
    founders: 'Emma Wilson, James Lee',
    industry: 'HealthTech',
    email: 'emma@healthtechai.com',
    prelovcStatus: 'proceed',
    investorStatus: 'proceed',
    favorite: true,
    oneliner: 'AI-powered diagnostics for early disease detection',
    metrics: {
      market: 92,
      team: 88,
      vcMatch: 95,
      product: 90,
      traction: 85
    }
  },
  {
    id: '5',
    match: 65,
    uploaded: '2024-03-11',
    company: 'EduTech Plus',
    raising: '$3M',
    stage: 'Pre-seed',
    founders: 'Robert Chang, Anna Smith',
    industry: 'EdTech',
    email: 'robert@edutechplus.com',
    prelovcStatus: 'not-fundable',
    investorStatus: 'not-reviewed',
    favorite: false,
    oneliner: 'Personalized learning platform for K-12 students',
    metrics: {
      market: 70,
      team: 65,
      vcMatch: 65,
      product: 60,
      traction: 45
    }
  }
];

const SearchDealsPage: React.FC<SearchDealsPageProps> = ({ isDark, onBack }) => {
  const [deals, setDeals] = useState(mockDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<typeof mockDeals[0] | null>(null);
  const [filters, setFilters] = useState({
    matchRange: [0, 100] as [number, number],
    prelovcStatus: [] as string[],
    investorStatus: [] as string[],
    stages: [] as string[],
    onlyFavorites: false
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter deals based on search query
    const filtered = mockDeals.filter(deal => 
      deal.company.toLowerCase().includes(query.toLowerCase()) ||
      deal.industry.toLowerCase().includes(query.toLowerCase()) ||
      deal.founders.toLowerCase().includes(query.toLowerCase())
    );
    setDeals(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'proceed':
        return <ThumbsUp className="text-green-500" size={16} />;
      case 'conviction':
        return <ThumbsUp className="text-yellow-500" size={16} />;
      case 'not-fundable':
        return <ThumbsDown className="text-red-500" size={16} />;
      case 'not-reviewed':
        return <ThumbsUp className="text-gray-400" size={16} />;
      default:
        return <ThumbsUp className="text-gray-400" size={16} />;
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      matchRange: [0, 100],
      prelovcStatus: [],
      investorStatus: [],
      stages: [],
      onlyFavorites: false
    });
  };

  const toggleFavorite = (dealId: string) => {
    setDeals(deals.map(deal =>
      deal.id === dealId ? { ...deal, favorite: !deal.favorite } : deal
    ));
  };

  const handleRowClick = (e: React.MouseEvent, deal: typeof mockDeals[0]) => {
    const target = e.target as HTMLElement;
    if (target.closest('.favorite-button')) {
      return; // Don't show modal when clicking favorite button
    }
    setSelectedDeal(deal);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className={`flex items-center gap-4 p-4 border-b ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Search size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search deals by company, industry, or founder..."
            className={`flex-1 bg-transparent border-none focus:outline-none ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Sliders size={20} />
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        isDark={isDark}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className={isDark ? 'bg-gray-800/50' : 'bg-gray-50'}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Match</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Uploaded</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Company</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Raising</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Stage</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Founders</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Industry</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Email</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>PreloVC</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Investor</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Favorites</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {deals.map((deal) => (
              <tr
                key={deal.id}
                onClick={(e) => handleRowClick(e, deal)}
                className={`cursor-pointer ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                }`}
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
                  {deal.uploaded}
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
                    {deal.founders}
                  </div>
                </td>
                <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {deal.industry}
                </td>
                <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <a
                    href={`mailto:${deal.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-indigo-500"
                  >
                    <Mail size={16} />
                  </a>
                </td>
                <td className="px-4 py-3">
                  {getStatusIcon(deal.prelovcStatus)}
                </td>
                <td className="px-4 py-3">
                  {getStatusIcon(deal.investorStatus)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(deal.id);
                    }}
                    className="favorite-button p-1 rounded-full transition-colors"
                  >
                    <Star
                      size={16}
                      className={deal.favorite ? 'text-yellow-500 fill-yellow-500' : isDark ? 'text-gray-600' : 'text-gray-400'}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deal Summary Modal */}
      {selectedDeal && (
        <DealSummaryModal
          isDark={isDark}
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
};

export default SearchDealsPage;