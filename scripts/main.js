// Main Application Entry Point
import { initializeElements, elements } from './modules/elements.js';
import { loadSettings, saveSettings, resetSettings } from './modules/settings.js';
import { setTranslations, openSettingsModal, closeSettingsModal, closeFolderPopup,
         switchWallpaperTab, switchSettingsTab, setCurrentLanguage } from './modules/ui.js';
import { startClock, applyClockType } from './modules/clock.js';
import { loadBrowserBookmarks } from './modules/bookmarks.js';
import { performSearch } from './modules/search.js';
import {
  loadCustomWallpaper,
  handleCustomWallpaperUpload,
  handleUrlWallpaper,
  removeCustomWallpaper,
} from './modules/wallpaper.js';
import { renderCalendar, refreshCalendarTranslations } from './modules/calendar.js';
import { initTodo, refreshTodoTranslations } from './modules/todo.js';
import { initGrid } from './modules/grid.js';

document.addEventListener("DOMContentLoaded", function () {
  try {
    initializeElements();
    loadSettings();
    loadCustomWallpaper();
    setupEventListeners();
    startClock();
    loadBrowserBookmarks();
    setTranslations();
    if (elements.calendarWidget) renderCalendar(elements.calendarWidget);
    if (elements.todoWidget) initTodo(elements.todoWidget);
    initGrid();
  } catch (error) {
    console.error("Error initializing NewTab Pro:", error);
  }
});

function setupEventListeners() {
  // Search
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener("click", performSearch);
  }
  if (elements.searchInput) {
    elements.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  // Settings modal open/close
  if (elements.settingsBtn) {
    elements.settingsBtn.addEventListener("click", openSettingsModal);
  }
  document.querySelectorAll(".close").forEach((closeBtn) => {
    if (closeBtn.classList.contains("folder-close")) {
      closeBtn.addEventListener("click", closeFolderPopup);
    } else {
      closeBtn.addEventListener("click", closeSettingsModal);
    }
  });
  window.addEventListener("click", (e) => {
    if (elements.settingsModal && e.target === elements.settingsModal) closeSettingsModal();
    const folderModal = document.getElementById("folder-popup-modal");
    if (folderModal && e.target === folderModal) closeFolderPopup();
  });

  // Settings tabs
  document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      switchSettingsTab(this.dataset.tab);
    });
  });

  // Save / Reset
  if (elements.saveSettingsBtn)  elements.saveSettingsBtn.addEventListener("click", saveSettings);
  if (elements.resetSettingsBtn) elements.resetSettingsBtn.addEventListener("click", resetSettings);

  // Wallpaper upload
  if (elements.customWallpaperInput) {
    elements.customWallpaperInput.addEventListener("change", handleCustomWallpaperUpload);
  }
  const chooseWallpaperBtn = document.getElementById("choose-wallpaper-btn");
  if (chooseWallpaperBtn && elements.customWallpaperInput) {
    chooseWallpaperBtn.addEventListener("click", () => elements.customWallpaperInput.click());
  }
  const removeWallpaperBtn = document.getElementById("remove-wallpaper-btn");
  if (removeWallpaperBtn) {
    removeWallpaperBtn.addEventListener("click", removeCustomWallpaper);
  }

  // Wallpaper URL
  if (elements.urlWallpaperBtn) {
    elements.urlWallpaperBtn.addEventListener("click", handleUrlWallpaper);
  }
  if (elements.wallpaperUrlInput) {
    elements.wallpaperUrlInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUrlWallpaper();
    });
  }

  // Wallpaper inner tabs
  elements.wallpaperTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      switchWallpaperTab(this.dataset.tab);
    });
  });

  // Clock type live preview
  if (elements.clockTypeSelect) {
    elements.clockTypeSelect.addEventListener("change", function () {
      applyClockType(this.value);
    });
  }

  // Language live preview
  if (elements.languageSelect) {
    elements.languageSelect.addEventListener("change", function () {
      setCurrentLanguage(this.value);
      setTranslations();
      refreshCalendarTranslations();
      refreshTodoTranslations();
    });
  }
}

window.NewTabPro = {
  removeCustomWallpaper,
  setTranslations,
  switchWallpaperTab,
  handleUrlWallpaper,
};
