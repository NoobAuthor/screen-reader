const app = document.getElementById('app');

if (app) {
  app.innerHTML = `
    <h1>Screen Reader Optimizer Settings</h1>
    <form id="settingsForm">
      <label>
        <input type="checkbox" id="improveHeadings"> Improve Headings
      </label>
      <label>
        <input type="checkbox" id="addAltText"> Add Alt Text
      </label>
      <label>
        <input type="checkbox" id="enhanceFocusStyles"> Enhance Focus Styles
      </label>
      <label>
        <input type="checkbox" id="improveFormLabels"> Improve Form Labels
      </label>
      <button type="submit">Save Settings</button>
    </form>
  `;

  const form = document.getElementById('settingsForm') as HTMLFormElement;
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');

  // Load current settings
  chrome.storage.sync.get('settings', (data) => {
    const settings = data.settings as ExtensionSettings;
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        checkbox.checked = settings[checkbox.id as keyof ExtensionSettings];
      }
    });
  });

  // Save settings on form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSettings: Partial<ExtensionSettings> = {};
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        newSettings[checkbox.id as keyof ExtensionSettings] = checkbox.checked;
      }
    });
    chrome.storage.sync.set({ settings: newSettings }, () => {
      console.log('Settings saved');
      // Optionally, show a save confirmation message
    });
  });
}

// Add this interface to the top of the file
interface ExtensionSettings {
  improveHeadings: boolean;
  addAltText: boolean;
  enhanceFocusStyles: boolean;
  improveFormLabels: boolean;
}
