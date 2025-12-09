// Bookmarks Management Module
import { config } from '../config/constants.js';
import { elements } from './elements.js';
import { getCurrentTranslations, openFolderPopup } from './ui.js';

export function loadBrowserBookmarks() {
  if (typeof chrome !== "undefined" && chrome.bookmarks) {
    try {
      chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        if (chrome.runtime.lastError) {
          console.warn(
            "Error accessing bookmarks:",
            chrome.runtime.lastError.message
          );
          displayBookmarksFallback("permission_error");
        } else {
          const bookmarks = extractBookmarks(bookmarkTreeNodes);
          displayBrowserBookmarks(bookmarks);
        }
      });
    } catch (error) {
      console.error("Exception when accessing bookmarks:", error);
      displayBookmarksFallback("api_error");
    }
  } else {
    console.warn("Chrome bookmarks API not available");
    displayBookmarksFallback("no_api");
  }
}

function extractBookmarks(bookmarkTreeNodes) {
  const bookmarks = [];
  const folders = [];

  function traverse(nodes, parentPath = "") {
    if (!nodes || !Array.isArray(nodes)) return;

    nodes.forEach((node) => {
      if (node.url && bookmarks.length < config.maxBookmarks) {
        bookmarks.push({
          title: node.title || "Untitled",
          url: node.url,
          icon: getFaviconUrl(node.url),
          type: "bookmark"
        });
      } else if (node.children && node.title && node.title !== "Bookmarks Bar" && node.title !== "Other Bookmarks") {
        const folderPath = parentPath ? `${parentPath}/${node.title}` : node.title;
        const childBookmarks = [];
        const childFolders = [];

        function extractFromFolder(folderNode) {
          if (!folderNode.children) return;

          folderNode.children.forEach((child) => {
            if (child.url) {
              childBookmarks.push({
                title: child.title || "Untitled",
                url: child.url,
                icon: getFaviconUrl(child.url),
                type: "bookmark"
              });
            } else if (child.children && child.title) {
              childFolders.push({
                title: child.title,
                type: "folder",
                children: child.children
              });
            }
          });
        }

        extractFromFolder(node);

        if (childBookmarks.length > 0 || childFolders.length > 0) {
          folders.push({
            title: node.title,
            path: folderPath,
            type: "folder",
            bookmarkCount: childBookmarks.length,
            folderCount: childFolders.length,
            children: childBookmarks
          });
        }

        traverse(node.children, folderPath);
      } else if (node.children) {
        traverse(node.children, parentPath);
      }
    });
  }

  traverse(bookmarkTreeNodes);
  return { bookmarks, folders };
}

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
}

function displayBrowserBookmarks(data) {
  if (!elements.bookmarksGrid) {
    console.error("Bookmarks grid not found");
    return;
  }

  elements.bookmarksGrid.innerHTML = "";

  const { bookmarks, folders } = data;
  const totalItems = bookmarks.length + folders.length;

  if (totalItems === 0) {
    displayBookmarksFallback("no_bookmarks");
    return;
  }

  folders.forEach((folder) => {
    const folderElement = createFolderElement(folder);
    elements.bookmarksGrid.appendChild(folderElement);
  });

  bookmarks.forEach((bookmark) => {
    const bookmarkElement = createBookmarkElement(bookmark);
    elements.bookmarksGrid.appendChild(bookmarkElement);
  });
}

function displayBookmarksFallback(reason = "unknown") {
  if (!elements.bookmarksGrid) return;

  const translations = getCurrentTranslations();
  let message = translations.bookmarksNotAvailable || "Bookmarks not available";
  let subMessage = "";

  switch (reason) {
    case "permission_error":
      subMessage =
        translations.enableBookmarkPermissions ||
        "Enable bookmark permissions to see them here";
      break;
    case "no_api":
      subMessage = isBrave()
        ? translations.braveRestriction ||
          "Brave browser may restrict bookmark access"
        : translations.enableBookmarkPermissions ||
          "Enable bookmark permissions to see them here";
      break;
    case "no_bookmarks":
      message = translations.noBookmarksFound || "No bookmarks found";
      subMessage =
        translations.addBookmarksChrome ||
        "Add some bookmarks in Chrome to see them here";
      break;
    default:
      subMessage =
        translations.enableBookmarkPermissions ||
        "Enable bookmark permissions to see them here";
  }

  elements.bookmarksGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.7); padding: 2rem;">
      <i class="fas fa-bookmark" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
      <p>${message}</p>
      <p style="font-size: 0.8rem; margin-top: 0.5rem;">${subMessage}</p>
    </div>
  `;
}

function isBrave() {
  return (
    (navigator.brave && navigator.brave.isBrave) ||
    navigator.userAgent.includes("Brave")
  );
}

function createFolderElement(folder) {
  const div = document.createElement("div");
  div.className = "bookmark-item folder-item";

  div.innerHTML = `
    <i class="fas fa-folder folder-icon"></i>
    <div class="folder-content">
      <span class="folder-title" title="${folder.title}">${folder.title}</span>
    </div>
  `;

  div.addEventListener("click", function () {
    openFolderPopup(folder);
  });

  return div;
}

function createBookmarkElement(bookmark) {
  const div = document.createElement("div");
  div.className = "bookmark-item";

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
  });

  return div;
}
