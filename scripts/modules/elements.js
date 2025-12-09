// DOM Elements Manager
export const elements = {
  searchInput: null,
  searchBtn: null,
  bookmarksGrid: null,
  settingsBtn: null,
  settingsModal: null,
  wallpaperSelect: null,
  defaultSearchEngineSelect: null,
  clockTypeSelect: null,
  languageSelect: null,
  bookmarksEnabledCheckbox: null,
  saveSettingsBtn: null,
  customWallpaperInput: null,
  customWallpaperPreview: null,
  removeWallpaperBtn: null,
  wallpaperUrlInput: null,
  urlWallpaperBtn: null,
  wallpaperTabs: null,
  resetSettingsBtn: null,
};

export function initializeElements() {
  elements.searchInput = document.getElementById("search-input");
  elements.searchBtn = document.getElementById("search-btn");
  elements.bookmarksGrid = document.getElementById("bookmarks-grid");
  elements.settingsBtn = document.getElementById("settings-btn");
  elements.settingsModal = document.getElementById("settings-modal");
  elements.wallpaperSelect = document.getElementById("wallpaper-select");
  elements.defaultSearchEngineSelect = document.getElementById("default-search-engine");
  elements.clockTypeSelect = document.getElementById("clock-type");
  elements.languageSelect = document.getElementById("language");
  elements.bookmarksEnabledCheckbox = document.getElementById("bookmarks-enabled");
  elements.saveSettingsBtn = document.getElementById("save-settings");
  elements.customWallpaperInput = document.getElementById("custom-wallpaper-input");
  elements.customWallpaperPreview = document.getElementById("custom-wallpaper-preview");
  elements.removeWallpaperBtn = document.getElementById("remove-wallpaper-btn");
  elements.wallpaperUrlInput = document.getElementById("wallpaper-url-input");
  elements.urlWallpaperBtn = document.getElementById("url-wallpaper-btn");
  elements.wallpaperTabs = document.querySelectorAll(".wallpaper-tab");
  elements.resetSettingsBtn = document.getElementById("reset-settings-btn");
}
