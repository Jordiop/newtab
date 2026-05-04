// Image compression and URL validation — pure functions, no DOM state
import { config } from '../config/constants.js';

export function isValidImageUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    return (
      validExtensions.some((ext) => pathname.endsWith(ext)) ||
      /\.(unsplash|pexels|pixabay|imgur)\./.test(urlObj.hostname) ||
      /\.(jpg|jpeg|png|gif|webp|svg)/i.test(urlObj.search) ||
      pathname.includes('/photo/') ||
      pathname.includes('/image/')
    );
  } catch {
    return false;
  }
}

export function loadImageFromUrl(url) {
  if (!isValidImageUrl(url)) return Promise.reject(new Error('Invalid image URL format'));

  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeout = setTimeout(() => reject(new Error('URL loading timeout')), config.urlTimeout);

    img.onload = () => {
      clearTimeout(timeout);
      resolve({ type: 'url', data: url, compressed: false, originalSize: null,
                dimensions: { width: img.width, height: img.height } });
    };
    img.onerror = () => { clearTimeout(timeout); reject(new Error('Failed to load image from URL')); };
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}

function compressToLevel(img, canvas, ctx, level) {
  return new Promise((resolve) => {
    const { maxSize, quality, maxDim } = level;
    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const ratio = Math.min(maxDim / width, maxDim / height);
      width  = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }
    canvas.width  = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl  = canvas.toDataURL('image/jpeg', quality);
    const sizeInBytes = Math.round(((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3) / 4);
    resolve(sizeInBytes <= maxSize ? { dataUrl, size: sizeInBytes, dimensions: { width, height }, quality, compressed: true } : null);
  });
}

export function compressImageAdvanced(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = async () => {
      for (const level of config.compressionLevels) {
        try {
          const result = await compressToLevel(img, canvas, ctx, level);
          if (result) { resolve(result); return; }
        } catch (_) { continue; }
      }
      reject(new Error('Image too large for any compression level'));
    };

    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = URL.createObjectURL(file);
  });
}
