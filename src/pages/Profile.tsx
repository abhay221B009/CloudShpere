import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useFileStore } from '../store/fileStore';
import { User } from 'lucide-react';
import { StorageUsage } from '../components/StorageUsage';

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { files } = useFileStore();

  if (!user) return null;

  const totalFiles = files.length;
  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Files</h3>
              <p className="text-3xl font-bold text-blue-600">{totalFiles}</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Downloads</h3>
              <p className="text-3xl font-bold text-blue-600">{totalDownloads}</p>
            </div>
          </div>

          <StorageUsage />
        </div>
      </div>
    </div>
  );
};