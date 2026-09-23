import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { getUploadsDir, isAllowedMime, MAX_IMAGE_SIZE_BYTES } from './image-types';

export const imageUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: (_req, _file, callback) => {
      const dir = getUploadsDir();
      mkdirSync(dir, { recursive: true });
      callback(null, dir);
    },
    filename: (_req, _file, callback) => callback(null, randomUUID()),
  }),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },

  fileFilter: (_req, file, callback) => {
    if (isAllowedMime(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException('Only jpeg, png, gif and webp images are allowed'), false);
    }
  },
};
