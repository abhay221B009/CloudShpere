export interface User {
  id: string;
  email: string;
  name: string;
  storageUsed: number;
  storageLimit: number;
}

export interface File {
  id: string;
  name: string;
  size: number;
  downloads: number;
  uploadDate: string;
  userId: string;
  type: string;
  shareLink?: string;
  shareSecret?: string;
  expiryDate?: string;
}

export interface ShareDetails {
  link: string;
  secret: string;
  expiryDate: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface ConversionOptions {
  from: string;
  to: string;
}

export const SUPPORTED_CONVERSIONS = {
  'doc': ['pdf'],
  'docx': ['pdf'],
  'jpg': ['png', 'webp'],
  'jpeg': ['png', 'webp'],
  'png': ['jpg', 'webp'],
  'webp': ['jpg', 'png']
} as const;