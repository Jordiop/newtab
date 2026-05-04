// Grid layout persistence — chrome.storage.sync with localStorage fallback
import { storage } from './storage.js';

export function saveLayout(layout) {
  if (storage.available()) {
    storage.sync.set({ gridLayout: layout }).catch((err) => {
      console.warn('Grid layout save error:', err);
      _saveLocalStorage(layout);
    });
  } else {
    _saveLocalStorage(layout);
  }
}

export function loadLayout(defaultLayout) {
  return new Promise((resolve) => {
    const merge = (saved) => {
      const layout = { ...defaultLayout };
      if (saved) {
        for (const key of Object.keys(defaultLayout)) {
          if (saved[key]) layout[key] = saved[key];
        }
      }
      return layout;
    };

    if (storage.available()) {
      storage.sync.get(['gridLayout'])
        .then((result) => resolve(merge(result.gridLayout)))
        .catch((err) => {
          console.warn('Grid layout load error:', err);
          resolve(merge(_loadLocalStorage()));
        });
    } else {
      resolve(merge(_loadLocalStorage()));
    }
  });
}

function _saveLocalStorage(layout) {
  try { localStorage.setItem('gridLayout', JSON.stringify(layout)); } catch (_) {}
}

function _loadLocalStorage() {
  try { return JSON.parse(localStorage.getItem('gridLayout')); } catch (_) { return null; }
}
