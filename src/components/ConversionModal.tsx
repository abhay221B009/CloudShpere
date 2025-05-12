import React, { useState } from 'react';
import { X, FileType2 } from 'lucide-react';
import { SUPPORTED_CONVERSIONS } from '../types';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileType: string;
  onConvert: (format: string) => Promise<void>;
}

export const ConversionModal: React.FC<ConversionModalProps> = ({
  isOpen,
  onClose,
  fileName,
  fileType,
  onConvert
}) => {
  const [converting, setConverting] = useState(false);
  const supportedFormats = SUPPORTED_CONVERSIONS[fileType as keyof typeof SUPPORTED_CONVERSIONS] || [];

  const handleConvert = async (format: string) => {
    setConverting(true);
    try {
      await onConvert(format);
      onClose();
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setConverting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FileType2 className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold">Convert File</h2>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Converting: <span className="font-medium">{fileName}</span>
          </p>
        </div>

        {supportedFormats.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select target format:</p>
            <div className="grid grid-cols-2 gap-3">
              {supportedFormats.map(format => (
                <button
                  key={format}
                  onClick={() => handleConvert(format)}
                  disabled={converting}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    converting
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  .{format}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No conversion options available for this file type.</p>
        )}

        {converting && (
          <div className="mt-4 text-center text-sm text-blue-600">
            Converting your file...
          </div>
        )}
      </div>
    </div>
  );
};