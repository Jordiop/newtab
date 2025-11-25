// Main Application Entry Point
import { initializeElements, elements } from './modules/elements.js';
import { loadSettings, saveSettings, applySettings, resetSettings } from './modules/settings.js';
import { setTranslations, openSettingsModal, closeSettingsModal, closeFolderPopup, switchWallpaperTab, setCurrentLanguage } from './modules/ui.js';
import { startClock, applyClockType } from './modules/clock.js';
import { loadBrowserBookmarks } from './modules/bookmarks.js';
import { performSearch } from './modules/search.js';
import {
  loadCustomWallpaper,
  handleCustomWallpaperUpload,
  handleUrlWallpaper,
  removeCustomWallpaper,
  updateCustomWallpaperPreview
} from './modules/wallpaper.js';

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  try {
    initializeElements();
    loadSettings();
    loadCustomWallpaper();
    setupEventListeners();
    startClock();
    loadBrowserBookmarks();
    setTranslations();
  } catch (error) {
    console.error("Error initializing NewTab Pro:", error);
  }
});

// Setup all event listeners
function setupEventListeners() {
  // Search functionality
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener("click", performSearch);
  }

  if (elements.searchInput) {
    elements.searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  // Settings modal
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

  // Collapsible sections
  setupCollapsibleSections();

  window.addEventListener("click", function (e) {
    if (elements.settingsModal && e.target === elements.settingsModal) {
      closeSettingsModal();
    }
    const folderModal = document.getElementById("folder-popup-modal");
    if (folderModal && e.target === folderModal) {
      closeFolderPopup();
    }
  });

  // Save settings
  if (elements.saveSettingsBtn) {
    elements.saveSettingsBtn.addEventListener("click", saveSettings);
  }

  // Reset settings
  if (elements.resetSettingsBtn) {
    elements.resetSettingsBtn.addEventListener("click", resetSettings);
  }

  // Custom wallpaper upload
  if (elements.customWallpaperInput) {
    elements.customWallpaperInput.addEventListener(
      "change",
      handleCustomWallpaperUpload
    );
  }

  const chooseWallpaperBtn = document.getElementById("choose-wallpaper-btn");
  if (chooseWallpaperBtn && elements.customWallpaperInput) {
    chooseWallpaperBtn.addEventListener("click", function () {
      elements.customWallpaperInput.click();
    });
  }

  const removeWallpaperBtn = document.getElementById("remove-wallpaper-btn");
  if (removeWallpaperBtn) {
    removeWallpaperBtn.addEventListener("click", removeCustomWallpaper);
  }

  // URL wallpaper
  if (elements.urlWallpaperBtn) {
    elements.urlWallpaperBtn.addEventListener("click", handleUrlWallpaper);
  }

  if (elements.wallpaperUrlInput) {
    elements.wallpaperUrlInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleUrlWallpaper();
      }
    });
  }

  // Wallpaper tabs
  elements.wallpaperTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      switchWallpaperTab(this.dataset.tab);
    });
  });

  // Clock type change
  if (elements.clockTypeSelect) {
    elements.clockTypeSelect.addEventListener("change", function () {
      const clockType = this.value;
      applyClockType(clockType);
    });
  }

  // Language change
  if (elements.languageSelect) {
    elements.languageSelect.addEventListener("change", function () {
      setCurrentLanguage(this.value);
      setTranslations();
    });
  }
}

// Setup collapsible sections
function setupCollapsibleSections() {
  const sectionHeaders = document.querySelectorAll('.section-header');

  sectionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Toggle current section
      this.classList.toggle('active');
      content.classList.toggle('active');

      // Optional: close other sections (accordion style)
      // Uncomment below to enable accordion behavior
      /*
      sectionHeaders.forEach(otherHeader => {
        if (otherHeader !== this) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
      */
    });
  });

  // Open first section by default
  if (sectionHeaders.length > 0) {
    sectionHeaders[0].classList.add('active');
    sectionHeaders[0].nextElementSibling.classList.add('active');
  }
}

// Export API for global access if needed
window.NewTabPro = {
  removeCustomWallpaper,
  setTranslations,
  switchWallpaperTab,
  handleUrlWallpaper,
};
