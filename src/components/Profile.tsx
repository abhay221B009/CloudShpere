import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useFileStore } from '../store/fileStore';
import { User } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { files } = useFileStore();

  if (!user) return null;

  const totalFiles = files.length;
  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User size={32} className="text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-1">Files</h3>
          <p className="text-2xl font-bold text-blue-600">{totalFiles}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-1">Downloads</h3>
          <p className="text-2xl font-bold text-blue-600">{totalDownloads}</p>
        </div>
      </div>
    </div>
  );
};