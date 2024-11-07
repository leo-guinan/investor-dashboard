import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Edit2, Save } from 'lucide-react';

interface AccountSettingsModalProps {
  isDark: boolean;
  onClose: () => void;
}

interface EditableField {
  section: keyof UserSettings;
  field: string;
}

interface UserSettings {
  registration: {
    firstName: string;
    lastName: string;
    firmName: string;
    firmUrl: string;
    specialNotes: string;
    submindUrl: string;
    accountEmail: string;
  };
  achievements: {
    exits: string;
    investments: string;
    experience: string;
  };
  profile: {
    passion: string;
    investments: string;
    industry: string;
    checkSize: string;
    investmentThesis: string;
  };
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isDark, onClose }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [settings, setSettings] = useState<UserSettings>({
    registration: {
      firstName: 'Sarah',
      lastName: 'Chen',
      firmName: 'PreloVC',
      firmUrl: 'https://prelovc.com',
      specialNotes: 'Focus on early-stage startups',
      submindUrl: 'prelovc.submind.co',
      accountEmail: 'sarah.chen@example.com'
    },
    achievements: {
      exits: '5',
      investments: '15',
      experience: '8'
    },
    profile: {
      passion: "I'm passionate about founders from underrepresented communities solving mission-driven problems, especially those addressing issues I've experienced or deeply understand.",
      investments: "I invest in industries like mental health, education, cultural recuperation, and technology, particularly those with a strong community impact and innovative solutions across US & Canada.",
      industry: "PropTech, FinTech, HealthTech",
      checkSize: "I write checks between $25,000 and $150,000 depending on the size and potential of the startup.",
      investmentThesis: "My investment thesis focuses on mission-driven companies led by diverse founders, particularly those addressing significant, relatable problems with innovative solutions."
    }
  });

  const startEditing = useCallback((section: keyof UserSettings, field: string) => {
    setEditingField({ section, field });
    setEditValue(settings[section][field]);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [settings]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof UserSettings,
    field: string
  ) => {
    const value = e.target.value;
    setEditValue(value);
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  }, []);

  const saveEdit = useCallback(() => {
    setEditingField(null);
    setEditValue('');
  }, []);

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('Save changes before closing?')) {
        // Save changes logic here
        onClose();
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const InputField = React.memo(({ 
    label, 
    value, 
    section,
    field,
    multiline = false,
    options = null
  }: { 
    label: string;
    value: string;
    section: keyof UserSettings;
    field: string;
    multiline?: boolean;
    options?: string[] | null;
  }) => {
    const isEditing = editingField?.section === section && editingField?.field === field;
    const displayValue = isEditing ? editValue : value;

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {label}
          </label>
          {!options && (
            <button
              onClick={() => isEditing ? saveEdit() : startEditing(section, field)}
              className={`p-1 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              {isEditing ? <Save size={14} /> : <Edit2 size={14} />}
            </button>
          )}
        </div>
        {options ? (
          <select
            value={displayValue}
            onChange={(e) => handleInputChange(e, section, field)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-gray-100'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : multiline ? (
          <textarea
            ref={isEditing ? inputRef as React.RefObject<HTMLTextAreaElement> : null}
            value={displayValue}
            onChange={(e) => handleInputChange(e, section, field)}
            onBlur={saveEdit}
            disabled={!isEditing}
            rows={4}
            className={`w-full px-3 py-2 rounded-lg border resize-none ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-gray-100'
                : 'bg-white border-gray-200 text-gray-900'
            } ${!isEditing && 'cursor-pointer'}`}
          />
        ) : (
          <input
            ref={isEditing ? inputRef as React.RefObject<HTMLInputElement> : null}
            type="text"
            value={displayValue}
            onChange={(e) => handleInputChange(e, section, field)}
            onBlur={saveEdit}
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-gray-100'
                : 'bg-white border-gray-200 text-gray-900'
            } ${!isEditing && 'cursor-pointer'}`}
          />
        )}
      </div>
    );
  });

  InputField.displayName = 'InputField';

  const numberOptions = Array.from({ length: 31 }, (_, i) => i.toString());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative w-full max-w-2xl rounded-xl shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h2>
          <button
            onClick={handleClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-8">
            {/* Registration Details */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Registration Details
              </h3>
              <div className="space-y-4">
                <InputField
                  label="First Name"
                  value={settings.registration.firstName}
                  section="registration"
                  field="firstName"
                />
                <InputField
                  label="Last Name"
                  value={settings.registration.lastName}
                  section="registration"
                  field="lastName"
                />
                <InputField
                  label="Firm Name"
                  value={settings.registration.firmName}
                  section="registration"
                  field="firmName"
                />
                <InputField
                  label="Firm URL"
                  value={settings.registration.firmUrl}
                  section="registration"
                  field="firmUrl"
                />
                <InputField
                  label="Special Notes"
                  value={settings.registration.specialNotes}
                  section="registration"
                  field="specialNotes"
                  multiline
                />
                <InputField
                  label="Submind URL"
                  value={settings.registration.submindUrl}
                  section="registration"
                  field="submindUrl"
                />
                <InputField
                  label="Account Email"
                  value={settings.registration.accountEmail}
                  section="registration"
                  field="accountEmail"
                />
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Achievements
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Exits"
                  value={settings.achievements.exits}
                  section="achievements"
                  field="exits"
                  options={numberOptions}
                />
                <InputField
                  label="Investments"
                  value={settings.achievements.investments}
                  section="achievements"
                  field="investments"
                  options={numberOptions}
                />
                <InputField
                  label="Experience"
                  value={settings.achievements.experience}
                  section="achievements"
                  field="experience"
                  options={numberOptions}
                />
              </div>
            </div>

            {/* Investor Profile */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Investor Profile
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Investment Thesis"
                  value={settings.profile.investmentThesis}
                  section="profile"
                  field="investmentThesis"
                  multiline
                />
                <InputField
                  label="Passion"
                  value={settings.profile.passion}
                  section="profile"
                  field="passion"
                  multiline
                />
                <InputField
                  label="Industries"
                  value={settings.profile.industry}
                  section="profile"
                  field="industry"
                  multiline
                />
                <InputField
                  label="Check Size"
                  value={settings.profile.checkSize}
                  section="profile"
                  field="checkSize"
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettingsModal;