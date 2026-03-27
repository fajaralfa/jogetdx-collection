let currentPage = getPageKey();

// store hooks
const pageHooks = {};
const cleanupHooks = {};

/**
 * Register Mount
 * @param {string} pageName 
 * @param {Function} callback 
 */
function onPageReady(pageName, callback) {
  if (!pageHooks[pageName]) {
    pageHooks[pageName] = [];
  }
  pageHooks[pageName].push(callback);
}

/**
 * Register Unmount
 * @param {string} pageName 
 * @param {Function} callback 
 */
function onPageLeave(pageName, callback) {
  if (!cleanupHooks[pageName]) {
    cleanupHooks[pageName] = [];
  }
  cleanupHooks[pageName].push(callback);
}

/**
 * Run Mount
 * @param {string} pageName 
 */
function runPageHooks(pageName) {
  const hooks = pageHooks[pageName] || [];
  hooks.forEach((cb) => cb());
}

/**
 * Run Unmount
 * @param {string} pageName 
 */
function runCleanup(pageName) {
  const hooks = cleanupHooks[pageName] || [];
  hooks.forEach((cb) => cb());
}

// --- global listener ---
$(document).on("page_loaded", () => {
  const newPage = getPageKey();

  // avoid running on initial load twice
  if (currentPage !== newPage) {
    if (currentPage) {
      runCleanup(currentPage);
    }
    currentPage = newPage;
  }

  runPageHooks(currentPage);
});

/**
 * Get page identity (pageName)
 * @returns {string}
 */
function getPageKey() {
  return location.pathname + location.search + location.hash;
}