import React, { useState } from 'react';
import { Download, Share2, Trash2, FileText, Image, File as FileIcon, Music, Video, FileType2 } from 'lucide-react';
import { useFileStore } from '../store/fileStore';
import { ShareModal } from './ShareModal';
import { ConversionModal } from './ConversionModal';
import { ShareDetails, File, SUPPORTED_CONVERSIONS } from '../types';

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return <FileText size={20} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return <Image size={20} />;
    case 'mp3':
    case 'wav':
      return <Music size={20} />;
    case 'mp4':
    case 'mov':
      return <Video size={20} />;
    default:
      return <FileIcon size={20} />;
  }
};

export const FileList: React.FC = () => {
  const { files, deleteFile, shareFile, downloadFile, convertFile } = useFileStore();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [conversionModalOpen, setConversionModalOpen] = useState(false);
  const [currentShareDetails, setCurrentShareDetails] = useState<ShareDetails | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileTypes = ['all', ...new Set(files.map(file => file.type))];
  
  const filteredFiles = selectedType === 'all' 
    ? files 
    : files.filter(file => file.type === selectedType);

  const handleShare = async (fileId: string) => {
    try {
      const details = await shareFile(fileId);
      setCurrentShareDetails(details);
      setShareModalOpen(true);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      await downloadFile(fileId);
      alert('Download started!');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleConvert = async (file: File) => {
    setSelectedFile(file);
    setConversionModalOpen(true);
  };

  const performConversion = async (targetFormat: string) => {
    if (!selectedFile) return;
    await convertFile(selectedFile.id, targetFormat);
  };

  const canBeConverted = (file: File) => {
    return Object.keys(SUPPORTED_CONVERSIONS).includes(file.type);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {fileTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {filteredFiles.map((file) => (
        <div
          key={file.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-gray-500">
                {getFileIcon(file.type)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB • Downloads: {file.downloads}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {canBeConverted(file) && (
                <button
                  onClick={() => handleConvert(file)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                  title="Convert"
                >
                  <FileType2 size={20} />
                </button>
              )}
              
              <button
                onClick={() => handleShare(file.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Share"
              >
                <Share2 size={20} />
              </button>
              
              <button
                onClick={() => handleDownload(file.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
              
              <button
                onClick={() => deleteFile(file.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {currentShareDetails && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareDetails={currentShareDetails}
        />
      )}

      {selectedFile && (
        <ConversionModal
          isOpen={conversionModalOpen}
          onClose={() => setConversionModalOpen(false)}
          fileName={selectedFile.name}
          fileType={selectedFile.type}
          onConvert={performConversion}
        />
      )}
    </div>
  );
};