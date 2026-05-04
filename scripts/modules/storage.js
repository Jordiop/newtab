// Promisified Chrome storage wrappers with localStorage fallback
function available() {
  return typeof chrome !== 'undefined' && !!chrome.storage;
}

function wrap(area, method, arg) {
  return new Promise((resolve, reject) => {
    chrome.storage[area][method](arg, (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(result);
    });
  });
}

export const storage = {
  available,
  local: {
    get:    (keys) => wrap('local', 'get', keys),
    set:    (obj)  => wrap('local', 'set', obj),
    remove: (keys) => wrap('local', 'remove', keys),
  },
  sync: {
    get:    (keys) => wrap('sync', 'get', keys),
    set:    (obj)  => wrap('sync', 'set', obj),
    remove: (keys) => wrap('sync', 'remove', keys),
  },
};
