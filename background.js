function updateContentScript(tabId) {
    chrome.storage.sync.get(['isEnabled'], (result) => {
      if (result.isEnabled !== false) { // Default to true if not set
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          }
        });
      }
    });
  }
  
  chrome.tabs.onActivated.addListener(activeInfo => {
    updateContentScript(activeInfo.tabId);
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      updateContentScript(tabId);
    }
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isEnabled: true });
  });
  