// UI Utilities - Notifications, Modals, etc.
import { translations } from '../config/translations.js';

let currentLanguage = "en";

export function setCurrentLanguage(lang) {
  currentLanguage = lang;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function getCurrentTranslations() {
  return translations[currentLanguage] || translations.en || {};
}

export function setTranslations() {
  const currentTranslations = getCurrentTranslations();

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (currentTranslations[key]) {
      if (
        element.tagName === "INPUT" &&
        (element.type === "text" || element.type === "url")
      ) {
        element.placeholder = currentTranslations[key];
      } else {
        element.textContent = currentTranslations[key];
      }
    }
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.placeholder =
      currentTranslations.searchPlaceholder || "Search the web...";
  }

  const wallpaperUrlInput = document.getElementById("wallpaper-url-input");
  if (wallpaperUrlInput) {
    wallpaperUrlInput.placeholder =
      currentTranslations.enterImageUrl || "Enter image URL...";
  }
}

export function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const colors = {
    success: "#141414",
    error: "#1a1010",
    info: "#141414",
    warning: "#1a1a10",
  };

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
    max-width: 300px;
    word-wrap: break-word;
    border: 1px solid #1e1e1e;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

export function openSettingsModal() {
  const settingsModal = document.getElementById("settings-modal");
  if (settingsModal) {
    settingsModal.style.display = "block";
    switchSettingsTab("appearance");
    switchWallpaperTab("upload");
  }
}

export function switchSettingsTab(tabName) {
  document.querySelectorAll('.settings-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.settings-tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.panel === tabName);
  });
}

export function closeSettingsModal() {
  const settingsModal = document.getElementById("settings-modal");
  if (settingsModal) {
    settingsModal.style.display = "none";
  }
}

export function openFolderPopup(folder) {
  const folderModal = document.getElementById("folder-popup-modal");
  const folderTitle = document.querySelector(".folder-popup-title");
  const folderBookmarksGrid = document.getElementById("folder-bookmarks-grid");

  if (!folderModal || !folderTitle || !folderBookmarksGrid) {
    console.error("Folder popup elements not found");
    return;
  }

  folderTitle.textContent = `${folder.title} Bookmarks`;
  folderBookmarksGrid.innerHTML = "";

  if (folder.children && folder.children.length > 0) {
    folder.children.forEach((bookmark) => {
      const bookmarkElement = createFolderBookmarkElement(bookmark);
      folderBookmarksGrid.appendChild(bookmarkElement);
    });
  } else {
    folderBookmarksGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: #666; padding: 2rem;">
        <i class="fas fa-bookmark" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
        <p>No bookmarks in this folder</p>
      </div>
    `;
  }

  folderModal.style.display = "block";
}

export function closeFolderPopup() {
  const folderModal = document.getElementById("folder-popup-modal");
  if (folderModal) {
    folderModal.style.display = "none";
  }
}

function createFolderBookmarkElement(bookmark) {
  const div = document.createElement("div");
  div.className = "folder-bookmark-item";

  const hasIcon = bookmark.icon && bookmark.icon.startsWith("http");

  div.innerHTML = `
    ${
      hasIcon
        ? `<img src="${bookmark.icon}" alt="" style="width: 16px; height: 16px; min-width: 16px;">`
        : `<i class="fas fa-link"></i>`
    }
    <span title="${bookmark.title}">${bookmark.title}</span>
  `;

  div.addEventListener("click", function () {
    window.open(bookmark.url, "_blank");
    closeFolderPopup();
  });

  return div;
}

export function switchWallpaperTab(tabName) {
  const wallpaperTabs = document.querySelectorAll(".wallpaper-tab");
  wallpaperTabs.forEach((tab) => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const uploadContent = document.getElementById("upload-wallpaper-content");
  const urlContent = document.getElementById("url-wallpaper-content");

  if (uploadContent && urlContent) {
    if (tabName === "upload") {
      uploadContent.style.display = "block";
      urlContent.style.display = "none";
    } else {
      uploadContent.style.display = "none";
      urlContent.style.display = "block";
    }
  }
}

// Add notification styles
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);
