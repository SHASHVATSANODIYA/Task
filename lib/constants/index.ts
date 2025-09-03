export const APP_CONFIG = {
  name: 'School Management System',
  description: 'Streamline your educational institution management',
  version: '1.0.0',
} as const;

export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  contact: 'Contact must be exactly 10 digits',
  minLength: (min: number) => `Minimum ${min} characters required`,
} as const;

export const IMAGE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  uploadPath: '/schoolImages/',
} as const;