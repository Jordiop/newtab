// Search Engines Configuration
export const searchEngines = {
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: 'fab fa-google'
  },
  ecosia: {
    name: 'Ecosia',
    url: 'https://www.ecosia.org/search?q=',
    icon: 'fas fa-leaf'
  },
  brave: {
    name: 'Brave',
    url: 'https://search.brave.com/search?q=',
    icon: 'fas fa-shield-alt'
  }
};

// Application Configuration
export const config = {
  clockUpdateInterval: 1000,
  maxBookmarks: 12,
  supportedImageTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  maxUploadSize: 50 * 1024 * 1024,
  compressionLevels: [
    { maxSize: 512 * 1024, quality: 0.9, maxDim: 2560 },
    { maxSize: 256 * 1024, quality: 0.8, maxDim: 1920 },
    { maxSize: 128 * 1024, quality: 0.7, maxDim: 1600 },
    { maxSize: 64 * 1024, quality: 0.6, maxDim: 1280 },
    { maxSize: 32 * 1024, quality: 0.5, maxDim: 1024 },
    { maxSize: 16 * 1024, quality: 0.4, maxDim: 800 },
  ],
  urlTimeout: 10000,
  chunkSize: 1024 * 1024,
};

// Default Settings
export const defaultSettings = {
  wallpaper: "flat-gray",
  defaultSearchEngine: "google",
  clockType: "analog",
  language: "en",
  bookmarksEnabled: true,
};
