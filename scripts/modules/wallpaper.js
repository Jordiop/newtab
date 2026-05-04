// Wallpaper Management — state, storage, DOM, and event handlers
import { elements } from './elements.js';
import { storage } from './storage.js';
import { getCurrentTranslations, showNotification } from './ui.js';
import { compressImageAdvanced, loadImageFromUrl } from './wallpaper-compress.js';
import { config } from '../config/constants.js';

export let customWallpaperData = {
  type: null, data: null, compressed: false, originalSize: null,
};

// ── Storage ─────────────────────────────────────────────────

export async function loadCustomWallpaper() {
  if (!storage.available()) { console.warn('Chrome storage not available'); return; }

  try {
    const local = await storage.local.get(['customWallpaper', 'wallpaperType', 'wallpaperUrl']);
    if (local.wallpaperType === 'url' && local.wallpaperUrl) {
      customWallpaperData = { type: 'url', data: local.wallpaperUrl, compressed: false, originalSize: null };
      applyCustomWallpaper(local.wallpaperUrl);
      updateCustomWallpaperPreview(local.wallpaperUrl);
    } else if (local.customWallpaper) {
      customWallpaperData = { type: 'upload', data: local.customWallpaper, compressed: true, originalSize: null };
      applyCustomWallpaper(local.customWallpaper);
      updateCustomWallpaperPreview(local.customWallpaper);
    } else {
      // Fallback to sync storage
      try {
        const synced = await storage.sync.get(['customWallpaper']);
        if (synced.customWallpaper) {
          customWallpaperData = { type: 'upload', data: synced.customWallpaper, compressed: true, originalSize: null };
          applyCustomWallpaper(synced.customWallpaper);
          updateCustomWallpaperPreview(synced.customWallpaper);
        }
      } catch (_) {}
    }
  } catch (error) {
    console.error('Error loading custom wallpaper:', error);
  }
}

export async function saveWallpaperData() {
  if (!customWallpaperData.data) {
    await storage.local.remove(['customWallpaper', 'wallpaperType', 'wallpaperUrl']);
    await storage.sync.remove(['customWallpaper']);
    return;
  }

  if (customWallpaperData.type === 'url') {
    await storage.local.set({ wallpaperType: 'url', wallpaperUrl: customWallpaperData.data });
    storage.local.remove(['customWallpaper']).catch(() => {});
    storage.sync.remove(['customWallpaper']).catch(() => {});
  } else {
    await storage.local.set({ wallpaperType: 'upload', customWallpaper: customWallpaperData.data });
    storage.local.remove(['wallpaperUrl']).catch(() => {});
  }
}

// ── DOM ──────────────────────────────────────────────────────

export function applyCustomWallpaper(wallpaperData) {
  if (wallpaperData) {
    document.body.style.backgroundImage = customWallpaperData.type === 'url'
      ? `url("${wallpaperData}")`
      : `url(${wallpaperData})`;
    document.body.style.backgroundSize     = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat   = 'no-repeat';
    document.body.removeAttribute('data-wallpaper');
  } else {
    document.body.style.backgroundImage = '';
  }
}

export function updateCustomWallpaperPreview(wallpaperData) {
  if (!elements.customWallpaperPreview) return;
  if (wallpaperData) {
    elements.customWallpaperPreview.style.backgroundImage = customWallpaperData.type === 'url'
      ? `url("${wallpaperData}")`
      : `url(${wallpaperData})`;
    elements.customWallpaperPreview.style.display = 'block';
    const infoText = customWallpaperData.type === 'url' ? 'URL Image'
      : customWallpaperData.compressed ? 'Compressed' : 'Original';
    elements.customWallpaperPreview.setAttribute('data-info', infoText);
    if (elements.removeWallpaperBtn) elements.removeWallpaperBtn.style.display = 'block';
  } else {
    elements.customWallpaperPreview.style.display = 'none';
    if (elements.removeWallpaperBtn) elements.removeWallpaperBtn.style.display = 'none';
  }
}

// ── Event Handlers ───────────────────────────────────────────

export async function handleCustomWallpaperUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const t = getCurrentTranslations();

  if (!config.supportedImageTypes.includes(file.type)) {
    showNotification(t.invalidImageType || 'Please select a valid image file', 'error');
    return;
  }
  if (file.size > config.maxUploadSize) {
    showNotification(t.imageTooLarge || 'Image file is too large', 'error');
    return;
  }

  showNotification(
    file.size > 5 * 1024 * 1024
      ? (t.processingLargeImage || 'Processing large image...')
      : (t.imageCompressing     || 'Processing image...'),
    'info'
  );

  try {
    try {
      const result = await compressImageAdvanced(file);
      customWallpaperData = { type: 'upload', data: result.dataUrl, compressed: true,
                               originalSize: file.size, compressedSize: result.size, dimensions: result.dimensions };
      updateCustomWallpaperPreview(result.dataUrl);
      showNotification(t.customWallpaperLoaded || 'Custom wallpaper loaded', 'success');
    } catch (_) {
      const reader = new FileReader();
      reader.onload = (e) => {
        customWallpaperData = { type: 'upload', data: e.target.result, compressed: false, originalSize: file.size };
        updateCustomWallpaperPreview(e.target.result);
        showNotification(t.fallbackStorage || 'Image loaded with fallback method', 'warning');
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error('Error processing image:', error);
    showNotification(t.imageReadError || 'Error reading image file', 'error');
    customWallpaperData = { type: null, data: null };
    updateCustomWallpaperPreview(null);
  }
}

export async function handleUrlWallpaper() {
  const url = elements.wallpaperUrlInput ? elements.wallpaperUrlInput.value.trim() : '';
  const t = getCurrentTranslations();

  if (!url) {
    showNotification(t.invalidUrl || 'Please enter a valid URL', 'error');
    return;
  }

  try {
    showNotification(t.urlLoading || 'Loading image from URL...', 'info');
    customWallpaperData = await loadImageFromUrl(url);
    updateCustomWallpaperPreview(url);
    showNotification(t.urlLoadSuccess || 'Image loaded successfully!', 'success');
  } catch (error) {
    console.error('Error loading URL wallpaper:', error);
    showNotification(t.urlLoadError || 'Failed to load image from URL', 'error');
    customWallpaperData = { type: null, data: null };
    updateCustomWallpaperPreview(null);
  }
}

export function removeCustomWallpaper() {
  customWallpaperData = { type: null, data: null };
  updateCustomWallpaperPreview(null);
  if (elements.customWallpaperInput)  elements.customWallpaperInput.value  = '';
  if (elements.wallpaperUrlInput)     elements.wallpaperUrlInput.value     = '';
  showNotification(getCurrentTranslations().customWallpaperRemoved || 'Custom wallpaper removed', 'info');
}
