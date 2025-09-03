import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { IMAGE_CONFIG } from '@/lib/constants';

export async function saveImage(imageFile: File): Promise<string> {
  if (!imageFile || imageFile.size === 0) {
    return '';
  }

  // Validate file type
  if (!IMAGE_CONFIG.allowedTypes.includes(imageFile.type)) {
    throw new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
  }

  // Validate file size
  if (imageFile.size > IMAGE_CONFIG.maxSize) {
    throw new Error('File size too large. Maximum 5MB allowed.');
  }

  // Create schoolImages directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'public', 'schoolImages');
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Generate unique filename
  const timestamp = Date.now();
  const fileName = `${timestamp}_${imageFile.name}`;
  const filePath = path.join(uploadsDir, fileName);
  
  // Save the file
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);
  
  return `${IMAGE_CONFIG.uploadPath}${fileName}`;
}