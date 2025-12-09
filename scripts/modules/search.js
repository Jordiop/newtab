// Search Module
import { searchEngines } from '../config/constants.js';
import { elements } from './elements.js';
import { currentSettings } from './settings.js';

export function performSearch() {
  const query = elements.searchInput ? elements.searchInput.value.trim() : "";
  const searchEngine = currentSettings?.defaultSearchEngine || "google";

  if (query) {
    const searchEngineConfig = searchEngines[searchEngine];
    if (searchEngineConfig) {
      const searchUrl = searchEngineConfig.url + encodeURIComponent(query);
      window.location.href = searchUrl;
      if (elements.searchInput) elements.searchInput.value = "";
    }
  } else {
    window.location.href = "https://www.google.com/";
  }
}
