import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

interface AccountSettingsPageProps {
  isDark: boolean;
  onBack: () => void;
}

const AccountSettingsPage: React.FC<AccountSettingsPageProps> = ({ isDark, onBack }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personal: {
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@example.com',
      uniqueLink: 'https://app.prelovc.com/share/investor/sarah',
      exits: '5',
      investments: '12',
      experienceYears: '8'
    },
    company: {
      firmName: 'PreloVC',
      firmUrl: 'https://prelovc.com',
      role: 'Partner',
      location: 'San Francisco, CA'
    },
    investment: {
      thesis: 'My investment thesis focuses on mission-driven companies led by diverse founders, particularly those addressing significant, relatable problems with innovative solutions.',
      passion: 'I\'m passionate about founders from underrepresented communities solving mission-driven problems, especially those addressing issues I\'ve experienced or deeply understand.',
      industries: 'I invest in industries like mental health, education, cultural recuperation, and technology, particularly those with a strong community impact and innovative solutions across US & Canada.',
      checkSize: 'I write checks between $25,000 and $150,000 depending on the size and potential of the startup.'
    },
    notifications: {
      emailNotifications: true,
      dealAlerts: true,
      weeklyDigest: true,
      marketingEmails: false
    }
  });

  const handleInputChange = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const generateNumberOptions = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => (
      <option key={i} value={i}>{i === max ? `${i}+` : i}</option>
    ));
  };

  return (
    <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {['personal', 'company', 'investment', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab
                  ? isDark 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-900 shadow-sm'
                  : isDark
                    ? 'text-gray-400 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Personal Information */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.personal.firstName}
                  onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.personal.lastName}
                  onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                value={formData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Unique Link
              </label>
              <input
                type="text"
                value={formData.personal.uniqueLink}
                readOnly
                className={`w-full px-3 py-2 rounded-lg border bg-opacity-50 ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-400'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Exits
                </label>
                <select
                  value={formData.personal.exits}
                  onChange={(e) => handleInputChange('personal', 'exits', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {generateNumberOptions(30)}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Investments
                </label>
                <select
                  value={formData.personal.investments}
                  onChange={(e) => handleInputChange('personal', 'investments', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {generateNumberOptions(30)}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Experience (Years)
                </label>
                <select
                  value={formData.personal.experienceYears}
                  onChange={(e) => handleInputChange('personal', 'experienceYears', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {generateNumberOptions(30)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Company Information */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Firm Name
              </label>
              <input
                type="text"
                value={formData.company.firmName}
                onChange={(e) => handleInputChange('company', 'firmName', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Firm URL
              </label>
              <input
                type="url"
                value={formData.company.firmUrl}
                onChange={(e) => handleInputChange('company', 'firmUrl', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Role
              </label>
              <input
                type="text"
                value={formData.company.role}
                onChange={(e) => handleInputChange('company', 'role', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Location
              </label>
              <input
                type="text"
                value={formData.company.location}
                onChange={(e) => handleInputChange('company', 'location', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>
        )}

        {/* Investment Preferences */}
        {activeTab === 'investment' && (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Investment Thesis
              </label>
              <textarea
                value={formData.investment.thesis}
                onChange={(e) => handleInputChange('investment', 'thesis', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Passion
              </label>
              <textarea
                value={formData.investment.passion}
                onChange={(e) => handleInputChange('investment', 'passion', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Industries
              </label>
              <textarea
                value={formData.investment.industries}
                onChange={(e) => handleInputChange('investment', 'industries', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Check Size
              </label>
              <textarea
                value={formData.investment.checkSize}
                onChange={(e) => handleInputChange('investment', 'checkSize', e.target.value)}
                rows={2}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>
        )}

        {/* Notification Preferences */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {Object.entries(formData.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className={`text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-12 h-6 rounded-full transition-colors ${
                      value
                        ? 'bg-indigo-600'
                        : isDark ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${
                      value ? 'translate-x-6 bg-white' : 'bg-white'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettingsPage;