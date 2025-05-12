import { create } from 'zustand';
import { File, ShareDetails } from '../types';
import { addDays, format } from 'date-fns';

interface FileState {
  files: File[];
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  shareFile: (fileId: string) => Promise<ShareDetails>;
  downloadFile: (fileId: string) => Promise<void>;
  convertFile: (fileId: string, targetFormat: string) => Promise<void>;
}

const dummyFiles: File[] = [
  {
    id: '1',
    name: 'document.pdf',
    size: 2048576,
    downloads: 5,
    uploadDate: '2024-03-15',
    userId: '1',
    type: 'pdf'
  },
  {
    id: '2',
    name: 'image.jpg',
    size: 1048576,
    downloads: 3,
    uploadDate: '2024-03-14',
    userId: '1',
    type: 'jpg'
  }
];

export const useFileStore = create<FileState>((set, get) => ({
  files: dummyFiles,
  uploadFile: async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ files: [...get().files, file] });
  },
  deleteFile: async (fileId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ files: get().files.filter(f => f.id !== fileId) });
  },
  shareFile: async (fileId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shareDetails: ShareDetails = {
      link: `https://share.example.com/${fileId}`,
      secret: Math.random().toString(36).substring(7),
      expiryDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    };
    
    set({
      files: get().files.map(f => 
        f.id === fileId 
          ? { ...f, shareLink: shareDetails.link, shareSecret: shareDetails.secret }
          : f
      ),
    });
    
    return shareDetails;
  },
  downloadFile: async (fileId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({
      files: get().files.map(f =>
        f.id === fileId
          ? { ...f, downloads: f.downloads + 1 }
          : f
      ),
    });
  },
  convertFile: async (fileId: string, targetFormat: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const file = get().files.find(f => f.id === fileId);
    if (!file) return;

    const newFileName = file.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
    const newFile: File = {
      ...file,
      id: Math.random().toString(36).substring(7),
      name: newFileName,
      type: targetFormat,
      downloads: 0,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    set({ files: [...get().files, newFile] });
  },
}));