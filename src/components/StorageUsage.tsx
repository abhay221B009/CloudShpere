import React from 'react';
import { useAuthStore } from '../store/authStore';

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = (bytes / Math.pow(1024, i)).toFixed(2);
  
  return `${formattedSize} ${sizes[i]}`;
};

export const StorageUsage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  const usagePercentage = (user.storageUsed / user.storageLimit) * 100;
  const formattedUsed = formatBytes(user.storageUsed);
  const formattedTotal = formatBytes(user.storageLimit);
  const formattedAvailable = formatBytes(user.storageLimit - user.storageUsed);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Storage Usage</h2>
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              usagePercentage > 90 ? 'bg-red-600' : 
              usagePercentage > 70 ? 'bg-yellow-600' : 
              'bg-blue-600'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{formattedUsed} used</span>
          <span className="text-gray-600">{formattedTotal} total</span>
        </div>
        
        <div className="text-center">
          <span className={`text-sm font-medium ${
            usagePercentage > 90 ? 'text-red-600' : 
            usagePercentage > 70 ? 'text-yellow-600' : 
            'text-blue-600'
          }`}>
            {formattedAvailable} available
          </span>
        </div>
      </div>
    </div>
  );
};