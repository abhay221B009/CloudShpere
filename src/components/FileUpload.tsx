import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useFileStore } from '../store/fileStore';
import { File } from '../types';

export const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useFileStore();

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fileType = file.name.split('.').pop()?.toLowerCase() || 'unknown';
        const newFile: File = {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: file.size,
          downloads: 0,
          uploadDate: new Date().toISOString().split('T')[0],
          userId: '1',
          type: fileType
        };
        await uploadFile(newFile);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
      />
      
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {isUploading ? 'Uploading...' : 'Upload files'}
      </h3>
      
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop your files here, or{' '}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700"
          onClick={() => fileInputRef.current?.click()}
        >
          browse
        </button>
      </p>
    </div>
  );
};