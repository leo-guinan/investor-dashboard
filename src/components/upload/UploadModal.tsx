import React, { useState, useCallback, useRef } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';
import ProgressSteps from './ProgressSteps';
import UploadSuccessModal from './UploadSuccessModal';

interface UploadModalProps {
  isDark: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const steps = [
  {
    label: 'Uploading File',
    description: 'Securely transferring your pitch deck'
  },
  {
    label: 'Processing Document',
    description: 'Analyzing content and structure'
  },
  {
    label: 'Calculating Match',
    description: 'Evaluating investment potential'
  },
  {
    label: 'Completed',
    description: 'Ready for review'
  }
];

const UploadModal: React.FC<UploadModalProps> = ({ isDark, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setCurrentStep(0);
    setUploadStatus('uploading');

    try {
      // Simulate file upload and processing steps
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Simulate processed data
      const mockProcessedData = {
        company: "RentFlow",
        match: 85,
        description: "AI-powered property management platform revolutionizing the rental market",
        funding: "$10M Series A",
        industry: "PropTech",
        traction: {
          revenue: "$2.5M ARR",
          growth: "125% YoY",
          customers: "15 enterprise clients"
        },
        founders: [
          {
            name: "Sarah Chen",
            role: "CEO",
            background: "Ex-Airbnb, Stanford CS"
          },
          {
            name: "Michael Rodriguez",
            role: "CTO",
            background: "Ex-Google, MIT AI Lab"
          }
        ]
      };

      setProcessedData(mockProcessedData);
      setUploadStatus('success');
      onUpload(file);
    } catch (error) {
      setError('An error occurred during upload. Please try again.');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className={`relative w-full max-w-lg rounded-xl shadow-lg ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Upload Pitch Deck
          </h2>
          <button
            onClick={onClose}
            disabled={isUploading}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isUploading ? (
            <>
              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                  isDark
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="text-center">
                  <FileText 
                    size={48} 
                    className={isDark ? 'text-gray-500 mx-auto mb-4' : 'text-gray-400 mx-auto mb-4'} 
                  />
                  <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    PDF (MAX. 10MB)
                  </p>
                  
                  {error && (
                    <div className="flex items-center gap-2 mt-4 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  {file && (
                    <div className={`mt-4 p-2 rounded-lg ${
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {file.name}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className={`px-4 py-2 text-sm rounded-lg ${
                    isDark
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!file}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    file
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : `${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-gray-400 cursor-not-allowed`
                  }`}
                >
                  <Upload size={16} />
                  <span>Upload</span>
                </button>
              </div>
            </>
          ) : (
            <div className="py-4">
              <ProgressSteps
                steps={steps}
                currentStep={currentStep}
                isDark={isDark}
              />
            </div>
          )}
        </div>
      </div>

      {processedData && (
        <UploadSuccessModal
          isDark={isDark}
          onClose={() => {
            setProcessedData(null);
            onClose();
          }}
          data={processedData}
        />
      )}
    </div>
  );
};

export default UploadModal;