
const elements = {
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
};

const searchEngines = {
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

const config = {
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

const translations = {
  en: {
    searchPlaceholder: "Search the web...",
    bookmarks: "Bookmarks",
    settings: "Settings",
    appearance: "Appearance",
    search: "Search",
    defaultSearchEngine: "Default Search Engine",
    clock: "Clock",
    clockType: "Clock Type",
    features: "Features",
    wallpaper: "Wallpaper",
    customWallpaper: "Custom Wallpaper",
    uploadImage: "Upload Image",
    urlImage: "URL Image",
    language: "Language",
    bookmarksEnabled: "Show bookmarks",
    saveSettings: "Save Settings",
    chooseImage: "Choose Image",
    removeCustomWallpaper: "Remove Custom Wallpaper",
    enterImageUrl: "Enter image URL...",
    loadFromUrl: "Load from URL",
    settingsSaved: "Settings saved successfully!",
    settingsError: "Error saving settings",
    settingsApplied: "Settings applied (not saved)",
    customWallpaperLoaded:
      "Custom wallpaper loaded. Click Save Settings to apply.",
    customWallpaperRemoved:
      "Custom wallpaper removed. Click Save Settings to apply.",
    invalidImageType:
      "Please select a valid image file (JPEG, PNG, GIF, WebP, SVG)",
    imageTooLarge: "Image file is too large. Please select an image under 50MB",
    imageReadError: "Error reading image file",
    bookmarksNotAvailable: "Bookmarks not available",
    braveRestriction: "Brave browser may restrict bookmark access",
    enableBookmarkPermissions: "Enable bookmark permissions to see them here",
    noBookmarksFound: "No bookmarks found",
    addBookmarksChrome: "Add some bookmarks in Chrome to see them here",
    imageCompressing: "Processing image...",
    storageQuotaError:
      "Image too large for storage. Using URL reference instead.",
    urlLoading: "Loading image from URL...",
    urlLoadError:
      "Failed to load image from URL. Please check the URL and try again.",
    urlLoadSuccess: "Image loaded from URL successfully!",
    invalidUrl: "Please enter a valid image URL",
    urlNotSupported: "URL does not appear to be an image",
    processingLargeImage: "Processing large image, please wait...",
    fallbackStorage: "Image too large, using optimized storage method",
  },
  es: {
    searchPlaceholder: "Buscar en la web...",
    bookmarks: "Marcadores",
    settings: "Configuración",
    appearance: "Apariencia",
    search: "Búsqueda",
    defaultSearchEngine: "Motor de búsqueda por defecto",
    clock: "Reloj",
    clockType: "Tipo de Reloj",
    features: "Características",
    wallpaper: "Fondo de pantalla",
    customWallpaper: "Fondo personalizado",
    uploadImage: "Subir Imagen",
    urlImage: "Imagen por URL",
    language: "Idioma",
    bookmarksEnabled: "Mostrar marcadores",
    saveSettings: "Guardar Configuración",
    chooseImage: "Elegir Imagen",
    removeCustomWallpaper: "Eliminar Fondo Personalizado",
    enterImageUrl: "Introduce URL de imagen...",
    loadFromUrl: "Cargar desde URL",
    settingsSaved: "¡Configuración guardada exitosamente!",
    settingsError: "Error al guardar la configuración",
    settingsApplied: "Configuración aplicada (no guardada)",
    customWallpaperLoaded:
      "Fondo personalizado cargado. Haz clic en Guardar Configuración para aplicar.",
    customWallpaperRemoved:
      "Fondo personalizado eliminado. Haz clic en Guardar Configuración para aplicar.",
    invalidImageType:
      "Por favor selecciona un archivo de imagen válido (JPEG, PNG, GIF, WebP, SVG)",
    imageTooLarge:
      "El archivo de imagen es demasiado grande. Por favor selecciona una imagen menor a 50MB",
    imageReadError: "Error leyendo el archivo de imagen",
    urlLoading: "Cargando imagen desde URL...",
    urlLoadError:
      "Error al cargar imagen desde URL. Verifica la URL e intenta de nuevo.",
    urlLoadSuccess: "¡Imagen cargada desde URL exitosamente!",
    invalidUrl: "Por favor introduce una URL de imagen válida",
    urlNotSupported: "La URL no parece ser una imagen",
    processingLargeImage: "Procesando imagen grande, por favor espera...",
    fallbackStorage:
      "Imagen demasiado grande, usando método de almacenamiento optimizado",
  },
  ca: {
    searchPlaceholder: "Cerca en la web...",
    bookmarks: "Marcadors",
    settings: "Configuració",
    appearance: "Aparença",
    search: "Cerca",
    defaultSearchEngine: "Motor de cerca per defecte",
    clock: "Rellotge",
    clockType: "Tipus de Rellotge",
    features: "Funcions",
    wallpaper: "Fons d'escriptori",
    customWallpaper: "Fons personalitzat",
    uploadImage: "Pujar Imatge",
    urlImage: "Imatge per URL",
    language: "Idioma",
    bookmarksEnabled: "Mostrar els marcadors",
    saveSettings: "Guardar Configuració",
    chooseImage: "Triar Imatge",
    removeCustomWallpaper: "Eliminar Fons Personalitzat",
    enterImageUrl: "Introdueix URL d'imatge...",
    loadFromUrl: "Carregar des d'URL",
    settingsSaved: "Configuració desada correctament!",
    settingsError: "Error en desar la configuració",
    settingsApplied: "Configuració aplicada (no desada)",
    customWallpaperLoaded:
      "Fons personalitzat carregat. Fes clic a Guardar Configuració per aplicar.",
    customWallpaperRemoved:
      "Fons personalitzat eliminat. Fes clic a Guardar Configuració per aplicar.",
    invalidImageType:
      "Si us plau selecciona un arxiu d'imatge vàlid (JPEG, PNG, GIF, WebP, SVG)",
    imageTooLarge:
      "L'arxiu d'imatge és massa gran. Si us plau selecciona una imatge menor de 50MB",
    imageReadError: "Error llegint l'arxiu d'imatge",
    urlLoading: "Carregant imatge des d'URL...",
    urlLoadError:
      "Error en carregar imatge des d'URL. Verifica l'URL i torna-ho a intentar.",
    urlLoadSuccess: "Imatge carregada des d'URL correctament!",
    invalidUrl: "Si us plau introdueix una URL d'imatge vàlida",
    urlNotSupported: "L'URL no sembla ser una imatge",
    processingLargeImage: "Processant imatge gran, si us plau espera...",
    fallbackStorage:
      "Imatge massa gran, utilitzant mètode d'emmagatzematge optimitzat",
  },
};

const defaultSettings = {
  wallpaper: "flat-gray",
  defaultSearchEngine: "google",
  clockType: "analog",
  language: "en",
  bookmarksEnabled: true,
};

let currentLanguage = "en";
let currentSettings = { ...defaultSettings };
let customWallpaperData = {
  type: null,
  data: null,
  compressed: false,
  originalSize: null,
};

document.addEventListener("DOMContentLoaded", function () {
  try {
    initializeElements();
    loadSettings();
    setupEventListeners();
    startClock();
    loadBrowserBookmarks();
    setTranslations();
  } catch (error) {
    console.error("Error initializing NewTab Pro:", error);
  }
});

function initializeElements() {
  elements.searchInput = document.getElementById("search-input");
  elements.searchBtn = document.getElementById("search-btn");

  elements.bookmarksGrid = document.getElementById("bookmarks-grid");
  elements.settingsBtn = document.getElementById("settings-btn");
  elements.settingsModal = document.getElementById("settings-modal");
  elements.wallpaperSelect = document.getElementById("wallpaper-select");
  elements.defaultSearchEngineSelect = document.getElementById("default-search-engine");
  elements.clockTypeSelect = document.getElementById("clock-type");
  elements.languageSelect = document.getElementById("language");
  elements.bookmarksEnabledCheckbox =
    document.getElementById("bookmarks-enabled");
  elements.saveSettingsBtn = document.getElementById("save-settings");
  elements.customWallpaperInput = document.getElementById(
    "custom-wallpaper-input"
  );
  elements.customWallpaperPreview = document.getElementById(
    "custom-wallpaper-preview"
  );
  elements.removeWallpaperBtn = document.getElementById("remove-wallpaper-btn");
  elements.wallpaperUrlInput = document.getElementById("wallpaper-url-input");
  elements.urlWallpaperBtn = document.getElementById("url-wallpaper-btn");
  elements.wallpaperTabs = document.querySelectorAll(".wallpaper-tab");
}

function getCurrentTranslations() {
  return translations[currentLanguage] || translations.en || {};
}

function setTranslations() {
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

  if (elements.searchInput) {
    elements.searchInput.placeholder =
      currentTranslations.searchPlaceholder || "Search the web...";
  }

  if (elements.wallpaperUrlInput) {
    elements.wallpaperUrlInput.placeholder =
      currentTranslations.enterImageUrl || "Enter image URL...";
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

function switchWallpaperTab(tabName) {
  elements.wallpaperTabs.forEach((tab) => {
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

function loadSettings() {
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

    loadCustomWallpaper();
  } else {
    console.warn("Chrome storage not available, using defaults");
    handleSettingsLoad(defaultSettings);
  }
}

async function loadCustomWallpaper() {
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

function handleSettingsLoad(settings) {
  currentSettings = settings;
  currentLanguage = settings.language || "en";
  applySettings(settings);
  populateSettingsForm(settings);
  setTranslations();
}

function applySettings(settings) {
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

  // Apply clock type
  applyClockType(settings.clockType || "analog");
}

function applyCustomWallpaper(wallpaperData) {
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
    document.body.setAttribute(
      "data-wallpaper",
      currentSettings.wallpaper || "flat-gray"
    );
  }
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

  updateCustomWallpaperPreview(customWallpaperData.data);
  if (elements.wallpaperUrlInput && customWallpaperData.type === "url") {
    elements.wallpaperUrlInput.value = customWallpaperData.data || "";
  }
}

function updateCustomWallpaperPreview(wallpaperData) {
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

function saveSettings() {
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
  currentLanguage = settings.language;

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

async function saveWallpaperData() {
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

function setupEventListeners() {
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

  window.addEventListener("click", function (e) {
    if (elements.settingsModal && e.target === elements.settingsModal) {
      closeSettingsModal();
    }
    const folderModal = document.getElementById("folder-popup-modal");
    if (folderModal && e.target === folderModal) {
      closeFolderPopup();
    }
  });

  if (elements.saveSettingsBtn) {
    elements.saveSettingsBtn.addEventListener("click", saveSettings);
  }

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
    elements.removeWallpaperBtn = removeWallpaperBtn;
  }

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

  elements.wallpaperTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      switchWallpaperTab(this.dataset.tab);
    });
  });

  if (elements.clockTypeSelect) {
    elements.clockTypeSelect.addEventListener("change", function () {
      const clockType = this.value;
      applyClockType(clockType);
    });
  }

  if (elements.languageSelect) {
    elements.languageSelect.addEventListener("change", function () {
      currentLanguage = this.value;

      setTranslations();
    });
  }
}

async function handleCustomWallpaperUpload(event) {
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

async function handleUrlWallpaper() {
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

function removeCustomWallpaper() {
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

function openSettingsModal() {
  if (elements.settingsModal) {
    elements.settingsModal.style.display = "block";
    switchWallpaperTab("upload");
  }
}

function closeSettingsModal() {
  if (elements.settingsModal) {
    elements.settingsModal.style.display = "none";
  }
}

function performSearch() {
  const query = elements.searchInput ? elements.searchInput.value.trim() : "";
  const searchEngine = currentSettings?.defaultSearchEngine || "google";
  
  if (query) {
    const searchEngineConfig = searchEngines[searchEngine];
    if (searchEngineConfig) {
      const searchUrl = searchEngineConfig.url + encodeURIComponent(query);
      // use the same page, not a new tab
      window.location.href = searchUrl; 
      // TODO: Let user choose to open a new tab or not
      if (elements.searchInput) elements.searchInput.value = "";
    }
  } else {
    // use the same page, not a new tab
    window.location.href = "https://www.google.com/";
  }
}

function loadBrowserBookmarks() {
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

function openFolderPopup(folder) {
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

function closeFolderPopup() {
  const folderModal = document.getElementById("folder-popup-modal");
  if (folderModal) {
    folderModal.style.display = "none";
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const colors = {
    success: "#4CAF50",
    error: "#f44336",
    info: "#2196F3",
    warning: "#ff9800",
  };

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
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

function applyClockType(clockType) {
  const analogClock = document.getElementById("analog-clock");
  const digitalClock = document.getElementById("digital-clock");

  if (clockType === "digital") {
    if (analogClock) analogClock.style.display = "none";
    if (digitalClock) digitalClock.style.display = "block";
  } else {
    if (analogClock) analogClock.style.display = "block";
    if (digitalClock) digitalClock.style.display = "none";
  }
}

function updateClock() {
  const clockType = currentSettings.clockType || "analog";
  
  if (clockType === "digital") {
    updateDigitalClock();
  } else {
    updateAnalogClock();
  }
}

function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const hourHand = document.querySelector(".hour");
  const minuteHand = document.querySelector(".minute");
  const secondHand = document.querySelector(".second");

  if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;
}

function updateDigitalClock() {
  const now = new Date();
  const timeElement = document.getElementById("digital-time");
  const dateElement = document.getElementById("digital-date");

  if (timeElement) {
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  if (dateElement) {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateString = now.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 
                                            currentLanguage === 'es' ? 'es-ES' : 
                                            currentLanguage === 'ca' ? 'ca-ES' : 'en-US', options);
    dateElement.textContent = dateString;
  }
}

function startClock() {
  updateClock();
  setInterval(updateClock, config.clockUpdateInterval);
}

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

window.NewTabPro = {
  removeCustomWallpaper: removeCustomWallpaper,
  getCurrentTranslations: getCurrentTranslations,
  showNotification: showNotification,
  setLanguage: function (lang) {
    currentLanguage = lang;
    setTranslations();
  },
  switchWallpaperTab: switchWallpaperTab,
  loadUrlWallpaper: handleUrlWallpaper,
};
