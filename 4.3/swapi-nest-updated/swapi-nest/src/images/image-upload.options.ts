import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';
import { isAllowedMime, MAX_IMAGE_SIZE_BYTES } from './image-types';

export const imageUploadOptions: MulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },

  fileFilter: (_req, file, callback) => {
    if (isAllowedMime(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException('Only jpeg, png, gif and webp images are allowed'), false);
    }
  },
};
