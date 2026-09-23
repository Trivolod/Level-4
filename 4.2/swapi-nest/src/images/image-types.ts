import { open } from 'fs/promises';
import { resolve } from 'path';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;
export type AllowedMime = (typeof ALLOWED_MIME_TYPES)[number];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const isAllowedMime = (value: string): value is AllowedMime =>
  (ALLOWED_MIME_TYPES as readonly string[]).includes(value);

export const getUploadsDir = (): string => resolve(process.cwd(), process.env.UPLOADS_DIR ?? 'uploads');

export async function detectImageMime(filePath: string): Promise<AllowedMime | null> {
  const handle = await open(filePath, 'r');
  try {
    const header = Buffer.alloc(12);
    const { bytesRead } = await handle.read(header, 0, header.length, 0);
    if (bytesRead < header.length) {
      return null;
    }
    if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
      return 'image/jpeg';
    }
    if (header.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
      return 'image/png';
    }
    const ascii = header.toString('ascii');
    if (ascii.startsWith('GIF87a') || ascii.startsWith('GIF89a')) {
      return 'image/gif';
    }
    if (ascii.startsWith('RIFF') && ascii.slice(8, 12) === 'WEBP') {
      return 'image/webp';
    }
    return null;
  } finally {
    await handle.close();
  }
}
