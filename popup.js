document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleExtension');

  // Load the saved state from storage
  chrome.storage.sync.get(['isEnabled'], (result) => {
    toggle.checked = result.isEnabled !== false; // Default to true if not set
  });

  // Save the state to storage when the checkbox is toggled
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ isEnabled: toggle.checked }, () => {
      // Reload the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
});
