import React from 'react';
import { FileList } from '../components/FileList';
import { FileUpload } from '../components/FileUpload';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { FileType2, Shield, Zap } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">Secure File Sharing Made Simple</h1>
              <p className="text-blue-100 text-lg mb-8">
                Share files securely with customizable expiry dates and built-in file conversion
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <Shield className="text-blue-200 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
                <p className="text-blue-100">
                  Every shared file is protected with a unique secret key
                </p>
              </div>

              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <FileType2 className="text-blue-200 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">File Conversion</h3>
                <p className="text-blue-100">
                  Convert between popular formats with a single click
                </p>
              </div>

              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <Zap className="text-blue-200 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Fast Transfer</h3>
                <p className="text-blue-100">
                  Upload and share files instantly with optimized transfer
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FileUpload />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Files</h2>
            <FileList />
          </motion.div>
        </div>
      </div>
    </>
  );
};