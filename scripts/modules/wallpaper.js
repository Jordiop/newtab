// Wallpaper Management Module
import { config } from '../config/constants.js';
import { elements } from './elements.js';
import { getCurrentTranslations, showNotification } from './ui.js';

export let customWallpaperData = {
  type: null,
  data: null,
  compressed: false,
  originalSize: null,
};

export async function loadCustomWallpaper() {
  if (typeof chrome === "undefined" || !chrome.storage) {
    console.warn("Chrome storage not available");
    return;
  }

  try {
    chrome.storage.local.get(
      ["customWallpaper", "wallpaperType", "wallpaperUrl"],
      function (result) {
        if (!chrome.runtime.lastError) {
          if (result.wallpaperType === "url" && result.wallpaperUrl) {
            customWallpaperData = {
              type: "url",
              data: result.wallpaperUrl,
              compressed: false,
              originalSize: null,
            };
            applyCustomWallpaper(result.wallpaperUrl);
            updateCustomWallpaperPreview(result.wallpaperUrl);
          } else if (result.customWallpaper) {
            customWallpaperData = {
              type: "upload",
              data: result.customWallpaper,
              compressed: true,
              originalSize: null,
            };
            applyCustomWallpaper(result.customWallpaper);
            updateCustomWallpaperPreview(result.customWallpaper);
          }
        }
      }
    );

    chrome.storage.sync.get(["customWallpaper"], function (result) {
      if (
        !chrome.runtime.lastError &&
        result.customWallpaper &&
        !customWallpaperData.data
      ) {
        customWallpaperData = {
          type: "upload",
          data: result.customWallpaper,
          compressed: true,
          originalSize: null,
        };
        applyCustomWallpaper(result.customWallpaper);
        updateCustomWallpaperPreview(result.customWallpaper);
      }
    });
  } catch (error) {
    console.error("Error loading custom wallpaper:", error);
  }
}

export function applyCustomWallpaper(wallpaperData) {
  if (wallpaperData) {
    if (customWallpaperData.type === "url") {
      document.body.style.backgroundImage = `url("${wallpaperData}")`;
    } else {
      document.body.style.backgroundImage = `url(${wallpaperData})`;
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.removeAttribute("data-wallpaper");
  } else {
    document.body.style.backgroundImage = "";
  }
}

export function updateCustomWallpaperPreview(wallpaperData) {
  if (elements.customWallpaperPreview) {
    if (wallpaperData) {
      if (customWallpaperData.type === "url") {
        elements.customWallpaperPreview.style.backgroundImage = `url("${wallpaperData}")`;
      } else {
        elements.customWallpaperPreview.style.backgroundImage = `url(${wallpaperData})`;
      }
      elements.customWallpaperPreview.style.display = "block";

      const infoText =
        customWallpaperData.type === "url"
          ? "URL Image"
          : customWallpaperData.compressed
          ? "Compressed"
          : "Original";
      elements.customWallpaperPreview.setAttribute("data-info", infoText);

      if (elements.removeWallpaperBtn) {
        elements.removeWallpaperBtn.style.display = "block";
      }
    } else {
      elements.customWallpaperPreview.style.display = "none";
      if (elements.removeWallpaperBtn) {
        elements.removeWallpaperBtn.style.display = "none";
      }
    }
  }
}

export async function saveWallpaperData() {
  if (!customWallpaperData.data) {
    await new Promise((resolve) => {
      chrome.storage.local.remove(
        ["customWallpaper", "wallpaperType", "wallpaperUrl"],
        resolve
      );
    });
    await new Promise((resolve) => {
      chrome.storage.sync.remove(["customWallpaper"], resolve);
    });
    return;
  }

  if (customWallpaperData.type === "url") {
    await new Promise((resolve, reject) => {
      chrome.storage.local.set(
        {
          wallpaperType: "url",
          wallpaperUrl: customWallpaperData.data,
        },
        function () {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        }
      );
    });

    chrome.storage.local.remove(["customWallpaper"]);
    chrome.storage.sync.remove(["customWallpaper"]);
  } else {
    await new Promise((resolve, reject) => {
      chrome.storage.local.set(
        {
          wallpaperType: "upload",
          customWallpaper: customWallpaperData.data,
        },
        function () {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        }
      );
    });

    chrome.storage.local.remove(["wallpaperUrl"]);
  }
}

function compressImageAdvanced(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      async function tryCompressionLevels() {
        for (let i = 0; i < config.compressionLevels.length; i++) {
          const level = config.compressionLevels[i];

          try {
            const result = await compressToLevel(img, canvas, ctx, level);
            if (result) {
              resolve(result);
              return;
            }
          } catch (error) {
            continue;
          }
        }

        reject(new Error("Image too large for any compression level"));
      }

      tryCompressionLevels();
    };

    img.onerror = () =>
      reject(new Error("Failed to load image for compression"));
    img.src = URL.createObjectURL(file);
  });
}

function compressToLevel(img, canvas, ctx, level) {
  return new Promise((resolve) => {
    const { maxSize, quality, maxDim } = level;

    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      const ratio = Math.min(maxDim / width, maxDim / height);
      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
    const sizeInBytes = Math.round(
      ((compressedDataUrl.length - "data:image/jpeg;base64,".length) * 3) / 4
    );

    if (sizeInBytes <= maxSize) {
      resolve({
        dataUrl: compressedDataUrl,
        size: sizeInBytes,
        dimensions: { width, height },
        quality,
        compressed: true,
      });
    } else {
      resolve(null);
    }
  });
}

export async function handleCustomWallpaperUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!config.supportedImageTypes.includes(file.type)) {
    showNotification(
      getCurrentTranslations().invalidImageType ||
        "Please select a valid image file",
      "error"
    );
    return;
  }

  if (file.size > config.maxUploadSize) {
    showNotification(
      getCurrentTranslations().imageTooLarge || "Image file is too large",
      "error"
    );
    return;
  }

  try {
    if (file.size > 5 * 1024 * 1024) {
      showNotification(
        getCurrentTranslations().processingLargeImage ||
          "Processing large image...",
        "info"
      );
    } else {
      showNotification(
        getCurrentTranslations().imageCompressing || "Processing image...",
        "info"
      );
    }

    try {
      const compressedResult = await compressImageAdvanced(file);
      customWallpaperData = {
        type: "upload",
        data: compressedResult.dataUrl,
        compressed: true,
        originalSize: file.size,
        compressedSize: compressedResult.size,
        dimensions: compressedResult.dimensions,
      };

      updateCustomWallpaperPreview(compressedResult.dataUrl);
      showNotification(
        getCurrentTranslations().customWallpaperLoaded ||
          "Custom wallpaper loaded",
        "success"
      );
    } catch (compressionError) {
      const reader = new FileReader();
      reader.onload = function (e) {
        customWallpaperData = {
          type: "upload",
          data: e.target.result,
          compressed: false,
          originalSize: file.size,
        };

        updateCustomWallpaperPreview(e.target.result);
        showNotification(
          getCurrentTranslations().fallbackStorage ||
            "Image loaded with fallback method",
          "warning"
        );
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error("Error processing image:", error);
    showNotification(
      getCurrentTranslations().imageReadError || "Error reading image file",
      "error"
    );
    customWallpaperData = { type: null, data: null };
    updateCustomWallpaperPreview(null);
  }
}

async function loadImageFromUrl(url) {
  if (!isValidImageUrl(url)) {
    throw new Error("Invalid image URL format");
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      reject(new Error("URL loading timeout"));
    }, config.urlTimeout);

    img.onload = function () {
      clearTimeout(timeout);

      resolve({
        type: "url",
        data: url,
        compressed: false,
        originalSize: null,
        dimensions: { width: img.width, height: img.height },
      });
    };

    img.onerror = function () {
      clearTimeout(timeout);
      reject(new Error("Failed to load image from URL"));
    };

    img.crossOrigin = "anonymous";
    img.src = url;
  });
}

function isValidImageUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    const validExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".bmp",
    ];

    const hasImageExtension = validExtensions.some((ext) =>
      pathname.endsWith(ext)
    );
    const isImageService = /\.(unsplash|pexels|pixabay|imgur)\./.test(
      urlObj.hostname
    );
    const hasImageParams = /\.(jpg|jpeg|png|gif|webp|svg)/i.test(urlObj.search);

    return (
      hasImageExtension ||
      isImageService ||
      hasImageParams ||
      pathname.includes("/photo/") ||
      pathname.includes("/image/")
    );
  } catch {
    return false;
  }
}

export async function handleUrlWallpaper() {
  const url = elements.wallpaperUrlInput
    ? elements.wallpaperUrlInput.value.trim()
    : "";

  if (!url) {
    showNotification(
      getCurrentTranslations().invalidUrl || "Please enter a valid URL",
      "error"
    );
    return;
  }

  try {
    showNotification(
      getCurrentTranslations().urlLoading || "Loading image from URL...",
      "info"
    );

    const urlResult = await loadImageFromUrl(url);
    customWallpaperData = urlResult;

    updateCustomWallpaperPreview(url);
    showNotification(
      getCurrentTranslations().urlLoadSuccess || "Image loaded successfully!",
      "success"
    );
  } catch (error) {
    console.error("Error loading URL wallpaper:", error);
    showNotification(
      getCurrentTranslations().urlLoadError || "Failed to load image from URL",
      "error"
    );
    customWallpaperData = { type: null, data: null };
    updateCustomWallpaperPreview(null);
  }
}

export function removeCustomWallpaper() {
  customWallpaperData = { type: null, data: null };
  updateCustomWallpaperPreview(null);

  if (elements.customWallpaperInput) {
    elements.customWallpaperInput.value = "";
  }
  if (elements.wallpaperUrlInput) {
    elements.wallpaperUrlInput.value = "";
  }

  showNotification(
    getCurrentTranslations().customWallpaperRemoved ||
      "Custom wallpaper removed",
    "info"
  );
}
