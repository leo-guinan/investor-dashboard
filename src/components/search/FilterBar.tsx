import React from 'react';
import { ChevronDown, X, Sliders, Star } from 'lucide-react';

interface FilterBarProps {
  isDark: boolean;
  filters: {
    matchRange: [number, number];
    prelovcStatus: string[];
    investorStatus: string[];
    stages: string[];
    onlyFavorites: boolean;
  };
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  isDark,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  const matchRanges = [
    { label: '90%+', range: [90, 100] },
    { label: '80% - 90%', range: [80, 90] },
    { label: '70% - 80%', range: [70, 80] },
    { label: '60% - 70%', range: [60, 70] },
    { label: '50% - 60%', range: [50, 60] },
    { label: '25% - 50%', range: [25, 50] },
    { label: '0% - 25%', range: [0, 25] }
  ];

  const stageOptions = [
    'Pre-Seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D'
  ];

  const prelovcOptions = [
    'Proceed with Deal',
    'More Conviction',
    'Not Yet Fundable'
  ];

  const investorOptions = [
    'Proceed with Deal',
    'More Conviction',
    'Not Yet Fundable',
    'Not Reviewed'
  ];

  const favoriteOptions = [
    'My Favorites',
    'Non-Favorites'
  ];

  const presets = [
    { label: 'High Match (90%+)', filters: { matchRange: [90, 100] } }
  ];

  const hasActiveFilters = 
    filters.matchRange[0] > 0 ||
    filters.matchRange[1] < 100 ||
    filters.prelovcStatus.length > 0 ||
    filters.investorStatus.length > 0 ||
    filters.stages.length > 0 ||
    filters.onlyFavorites;

  const getCurrentMatchRangeLabel = () => {
    const range = matchRanges.find(r => 
      r.range[0] === filters.matchRange[0] && r.range[1] === filters.matchRange[1]
    );
    return range ? range.label : 'Match';
  };

  return (
    <div className={`p-4 border-b ${
      isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/80'
    }`}>
      <div className="flex items-center gap-4">
        {/* Quick Filter Presets */}
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Quick Filters:
          </span>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  Object.entries(preset.filters).forEach(([key, value]) => {
                    onFilterChange(key, value);
                  });
                }}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Match Range Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              filters.matchRange[0] > 0 || filters.matchRange[1] < 100
                ? 'bg-indigo-500/10 text-indigo-500'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}>
              <span>{getCurrentMatchRangeLabel()}</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-lg shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-700 bg-gray-800">
              {matchRanges.map(({ label, range }) => (
                <button
                  key={label}
                  onClick={() => onFilterChange('matchRange', range)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.matchRange[0] === range[0] && filters.matchRange[1] === range[1]
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Stage Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              filters.stages.length > 0
                ? 'bg-indigo-500/10 text-indigo-500'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}>
              <span>Stage</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-lg shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-700 bg-gray-800">
              {stageOptions.map((stage) => (
                <button
                  key={stage}
                  onClick={() => onFilterChange('stages', [stage])}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.stages.includes(stage)
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* PreloVC Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              filters.prelovcStatus.length > 0
                ? 'bg-indigo-500/10 text-indigo-500'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}>
              <span>PreloVC</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-lg shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-700 bg-gray-800">
              {prelovcOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onFilterChange('prelovcStatus', [status])}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.prelovcStatus.includes(status)
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Investor Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              filters.investorStatus.length > 0
                ? 'bg-indigo-500/10 text-indigo-500'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}>
              <span>Investor</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-lg shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-700 bg-gray-800">
              {investorOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onFilterChange('investorStatus', [status])}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.investorStatus.includes(status)
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Favorites Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              filters.onlyFavorites
                ? 'bg-indigo-500/10 text-indigo-500'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}>
              <span>Favorites</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-lg shadow-lg invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-700 bg-gray-800">
              {favoriteOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onFilterChange('onlyFavorites', option === 'My Favorites')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    (option === 'My Favorites' && filters.onlyFavorites) ||
                    (option === 'Non-Favorites' && !filters.onlyFavorites)
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <>
            <div className="h-6 w-px bg-gray-700" />
            <button
              onClick={onClearFilters}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <X size={14} />
              <span>Clear Filters</span>
            </button>
          </>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {(filters.matchRange[0] > 0 || filters.matchRange[1] < 100) && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
            }`}>
              <span>{getCurrentMatchRangeLabel()}</span>
              <button
                onClick={() => onFilterChange('matchRange', [0, 100])}
                className="p-0.5 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {filters.stages.map((stage) => (
            <div
              key={stage}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}
            >
              <span>{stage}</span>
              <button
                onClick={() => onFilterChange('stages', filters.stages.filter(s => s !== stage))}
                className="p-0.5 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {filters.prelovcStatus.map((status) => (
            <div
              key={status}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}
            >
              <span>{status}</span>
              <button
                onClick={() => onFilterChange('prelovcStatus', filters.prelovcStatus.filter(s => s !== status))}
                className="p-0.5 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {filters.investorStatus.map((status) => (
            <div
              key={status}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
              }`}
            >
              <span>{status}</span>
              <button
                onClick={() => onFilterChange('investorStatus', filters.investorStatus.filter(s => s !== status))}
                className="p-0.5 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {filters.onlyFavorites && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'
            }`}>
              <span>My Favorites</span>
              <button
                onClick={() => onFilterChange('onlyFavorites', false)}
                className="p-0.5 hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;