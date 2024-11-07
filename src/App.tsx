import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import AnalysisPanel from './components/AnalysisPanel';
import PricingModal from './components/pricing/PricingModal';
import AccountSettingsPage from './components/settings/AccountSettingsPage';
import SearchDealsPage from './components/search/SearchDealsPage';

export interface FileData {
  name: string;
  date: string;
  match: number;
  industry: string;
  company: string;
  funding: string;
  founders?: {
    name: string;
    role: string;
    background: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
  }[];
  metrics: {
    market: number;
    team: number;
    vcMatch: number;
    product: number;
    traction: number;
  };
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearchDeals, setShowSearchDeals] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData>({
    name: 'RentFlow Pitch.pdf',
    date: '2024-03-15',
    match: 85,
    industry: 'PropTech',
    company: 'RentFlow',
    funding: '$10M Series A',
    founders: [
      {
        name: 'Sarah Chen',
        role: 'CEO',
        background: 'Ex-Airbnb, Stanford CS',
        email: 'sarah.chen@example.com',
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
  });
  
  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex h-screen">
        {showSettings ? (
          <AccountSettingsPage
            isDark={isDark}
            onBack={() => setShowSettings(false)}
          />
        ) : showSearchDeals ? (
          <SearchDealsPage
            isDark={isDark}
            onBack={() => setShowSearchDeals(false)}
          />
        ) : (
          <>
            <LeftPanel 
              isDark={isDark} 
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              onShowSettings={() => setShowSettings(true)}
            />
            
            <ChatPanel 
              isDark={isDark}
              onUpgradeClick={() => setShowPricing(true)}
              onShowSearchDeals={() => setShowSearchDeals(true)}
            />
            
            <AnalysisPanel 
              isDark={isDark} 
              fileData={selectedFile}
            />
          </>
        )}
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 text-white"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {showPricing && (
        <PricingModal
          isDark={isDark}
          onClose={() => setShowPricing(false)}
        />
      )}
    </div>
  );
}

export default App;