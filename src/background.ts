interface ExtensionSettings {
  improveHeadings: boolean;
  addAltText: boolean;
  enhanceFocusStyles: boolean;
  improveFormLabels: boolean;
}

const defaultSettings: ExtensionSettings = {
  improveHeadings: true,
  addAltText: true,
  enhanceFocusStyles: true,
  improveFormLabels: true
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings: defaultSettings }, () => {
    console.log('Default settings initialized');
  });
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get('settings', (data) => {
      sendResponse(data.settings || defaultSettings);
    });
    return true; // Indicates that the response is asynchronous
  }
  return false; // Indicates that we're not handling the message
});
