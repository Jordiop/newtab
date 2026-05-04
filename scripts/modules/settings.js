// Settings Management Module
import { defaultSettings } from '../config/constants.js';
import { elements } from './elements.js';
import { storage } from './storage.js';
import { getCurrentTranslations, showNotification, closeSettingsModal, setCurrentLanguage, setTranslations } from './ui.js';
import { applyCustomWallpaper, saveWallpaperData, customWallpaperData } from './wallpaper.js';
import { applyClockType } from './clock.js';

export let currentSettings = { ...defaultSettings };

const WIDGET_SELECTORS = {
  clockVisible:     '.clock-container',
  calendarVisible:  '#calendar-widget',
  todoVisible:      '#todo-widget',
  bookmarksVisible: '.bookmarks-section',
};

export function loadSettings() {
  if (!storage.available()) {
    console.warn('Chrome storage not available, using defaults');
    handleSettingsLoad(defaultSettings);
    return;
  }

  storage.sync.get(['settings'])
    .then((result) => {
      const saved = result.settings || {};
      // backwards-compat: map old bookmarksEnabled → bookmarksVisible
      if (saved.bookmarksEnabled !== undefined && saved.bookmarksVisible === undefined) {
        saved.bookmarksVisible = saved.bookmarksEnabled;
      }
      handleSettingsLoad({ ...defaultSettings, ...saved });
    })
    .catch((err) => {
      console.warn('Chrome storage error:', err);
      handleSettingsLoad(defaultSettings);
    });
}

function handleSettingsLoad(settings) {
  currentSettings = settings;
  setCurrentLanguage(settings.language || 'en');
  applySettings(settings);
  populateSettingsForm(settings);
  setTranslations();
}

export function applySettings(settings) {
  if (!customWallpaperData.data) document.body.style.backgroundImage = '';

  applyClockType(settings.clockType || 'analog');

  for (const [key, selector] of Object.entries(WIDGET_SELECTORS)) {
    const el = document.querySelector(selector);
    if (el) el.style.display = settings[key] !== false ? '' : 'none';
  }
}

function populateSettingsForm(settings) {
  if (elements.defaultSearchEngineSelect) elements.defaultSearchEngineSelect.value = settings.defaultSearchEngine || 'google';
  if (elements.clockTypeSelect)           elements.clockTypeSelect.value           = settings.clockType          || 'analog';
  if (elements.languageSelect)            elements.languageSelect.value            = settings.language           || 'en';
  if (elements.clockVisibleToggle)        elements.clockVisibleToggle.checked      = settings.clockVisible     !== false;
  if (elements.calendarVisibleToggle)     elements.calendarVisibleToggle.checked   = settings.calendarVisible  !== false;
  if (elements.todoVisibleToggle)         elements.todoVisibleToggle.checked       = settings.todoVisible      !== false;
  if (elements.bookmarksVisibleToggle)    elements.bookmarksVisibleToggle.checked  = settings.bookmarksVisible !== false;
}

export function saveSettings() {
  const settings = {
    defaultSearchEngine: elements.defaultSearchEngineSelect?.value  ?? 'google',
    clockType:           elements.clockTypeSelect?.value            ?? 'analog',
    language:            elements.languageSelect?.value             ?? 'en',
    clockVisible:        elements.clockVisibleToggle?.checked       ?? true,
    calendarVisible:     elements.calendarVisibleToggle?.checked    ?? true,
    todoVisible:         elements.todoVisibleToggle?.checked        ?? true,
    bookmarksVisible:    elements.bookmarksVisibleToggle?.checked   ?? true,
  };

  currentSettings = settings;
  setCurrentLanguage(settings.language);

  if (!storage.available()) {
    applySettings(settings);
    applyCustomWallpaper(customWallpaperData.data);
    setTranslations();
    closeSettingsModal();
    showNotification(getCurrentTranslations().settingsApplied || 'Settings applied (not saved)', 'info');
    return;
  }

  storage.sync.set({ settings })
    .then(() => saveWallpaperData())
    .then(() => {
      applySettings(settings);
      applyCustomWallpaper(customWallpaperData.data);
      setTranslations();
      closeSettingsModal();
      showNotification(getCurrentTranslations().settingsSaved || 'Settings saved successfully!', 'success');
    })
    .catch((error) => {
      console.error('Error saving settings/wallpaper:', error);
      showNotification(getCurrentTranslations().settingsError || 'Error saving settings', 'error');
    });
}

export async function resetSettings() {
  const translations = getCurrentTranslations();
  if (!confirm(translations.confirmReset || 'Are you sure you want to reset all settings to defaults?')) return;

  currentSettings = { ...defaultSettings };

  if (storage.available()) {
    try {
      await storage.sync.remove(['gridLayout']);
      await storage.sync.set({ settings: defaultSettings });
      await storage.local.remove(['customWallpaper', 'wallpaperType', 'wallpaperUrl']);
    } catch (err) {
      console.warn('Error during settings reset:', err);
    }
  }

  try { localStorage.removeItem('gridLayout'); } catch (_) {}
  window.location.reload();
}
