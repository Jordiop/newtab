// Settings Management Module
import { defaultSettings } from '../config/constants.js';
import { elements } from './elements.js';
import { getCurrentTranslations, showNotification, closeSettingsModal, setCurrentLanguage, setTranslations } from './ui.js';
import { applyCustomWallpaper, saveWallpaperData, customWallpaperData } from './wallpaper.js';
import { applyClockType } from './clock.js';

export let currentSettings = { ...defaultSettings };

export function loadSettings() {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(["settings"], function (result) {
      if (chrome.runtime.lastError) {
        console.warn("Chrome storage error:", chrome.runtime.lastError);
        handleSettingsLoad(defaultSettings);
      } else {
        const settings = { ...defaultSettings, ...(result.settings || {}) };
        handleSettingsLoad(settings);
      }
    });
  } else {
    console.warn("Chrome storage not available, using defaults");
    handleSettingsLoad(defaultSettings);
  }
}

function handleSettingsLoad(settings) {
  currentSettings = settings;
  setCurrentLanguage(settings.language || "en");
  applySettings(settings);
  populateSettingsForm(settings);
  setTranslations();
}

export function applySettings(settings) {
  if (!customWallpaperData.data) {
    document.body.style.backgroundImage = "";
    document.body.setAttribute(
      "data-wallpaper",
      settings.wallpaper || "flat-gray"
    );
  }

  const bookmarksSection = document.querySelector(".bookmarks-section");
  if (bookmarksSection) {
    bookmarksSection.style.display = settings.bookmarksEnabled
      ? "block"
      : "none";
  }

  applyClockType(settings.clockType || "analog");
}

function populateSettingsForm(settings) {
  if (elements.wallpaperSelect)
    elements.wallpaperSelect.value = settings.wallpaper || "flat-gray";
  if (elements.defaultSearchEngineSelect)
    elements.defaultSearchEngineSelect.value = settings.defaultSearchEngine || "google";
  if (elements.clockTypeSelect)
    elements.clockTypeSelect.value = settings.clockType || "analog";
  if (elements.languageSelect)
    elements.languageSelect.value = settings.language || "en";
  if (elements.bookmarksEnabledCheckbox)
    elements.bookmarksEnabledCheckbox.checked =
      settings.bookmarksEnabled !== false;
}

export function saveSettings() {
  const settings = {
    wallpaper: elements.wallpaperSelect
      ? elements.wallpaperSelect.value
      : "flat-gray",
    defaultSearchEngine: elements.defaultSearchEngineSelect
      ? elements.defaultSearchEngineSelect.value
      : "google",
    clockType: elements.clockTypeSelect
      ? elements.clockTypeSelect.value
      : "analog",
    language: elements.languageSelect ? elements.languageSelect.value : "en",
    bookmarksEnabled: elements.bookmarksEnabledCheckbox
      ? elements.bookmarksEnabledCheckbox.checked
      : true,
  };

  currentSettings = settings;
  setCurrentLanguage(settings.language);

  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ settings }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving settings:", chrome.runtime.lastError);
        showNotification(
          getCurrentTranslations().settingsError || "Error saving settings",
          "error"
        );
        return;
      }

      saveWallpaperData()
        .then(() => {
          applySettings(settings);
          applyCustomWallpaper(customWallpaperData.data);
          setTranslations();
          closeSettingsModal();
          showNotification(
            getCurrentTranslations().settingsSaved ||
              "Settings saved successfully!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error saving wallpaper:", error);
          showNotification(
            getCurrentTranslations().settingsError || "Error saving wallpaper",
            "error"
          );
        });
    });
  } else {
    applySettings(settings);
    applyCustomWallpaper(customWallpaperData.data);
    setTranslations();
    closeSettingsModal();
    showNotification(
      getCurrentTranslations().settingsApplied ||
        "Settings applied (not saved)",
      "info"
    );
  }
}

export function resetSettings() {
  const translations = getCurrentTranslations();
  const confirmed = confirm(
    translations.confirmReset || "Are you sure you want to reset all settings to defaults?"
  );

  if (!confirmed) return;

  currentSettings = { ...defaultSettings };

  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.set({ settings: defaultSettings }, function () {
      chrome.storage.local.remove(
        ["customWallpaper", "wallpaperType", "wallpaperUrl"],
        function () {
          window.location.reload();
        }
      );
    });
  } else {
    window.location.reload();
  }
}
