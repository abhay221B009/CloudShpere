import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ShareDetails } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareDetails: ShareDetails;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareDetails }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        
        <h2 className="text-xl font-semibold mb-4">Share File</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareDetails.link}
                className="flex-1 p-2 border rounded-md bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(shareDetails.link)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secret Key
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareDetails.secret}
                className="flex-1 p-2 border rounded-md bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(shareDetails.secret)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expires On
            </label>
            <input
              type="text"
              readOnly
              value={shareDetails.expiryDate}
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>
        </div>

        {copied && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};