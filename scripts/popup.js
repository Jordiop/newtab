// Popup functionality for NewTab Pro extension

document.addEventListener('DOMContentLoaded', function() {
    // Get popup elements
    const openNewtabBtn = document.getElementById('open-newtab');
    const settingsBtn = document.getElementById('settings');

    // Open new tab button
    if (openNewtabBtn) {
        openNewtabBtn.addEventListener('click', function() {
            chrome.tabs.create({ url: 'chrome://newtab/' });
            window.close();
        });
    }

    // Settings button (opens new tab and shows settings modal)
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            chrome.tabs.create({ 
                url: 'chrome://newtab/' 
            }, function(tab) {
                // Small delay to ensure the tab loads before executing script
                setTimeout(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: openSettingsModal
                    });
                }, 500);
            });
            window.close();
        });
    }
});

// Function to be injected into the new tab page to open settings modal
function openSettingsModal() {
    // Wait for the page to fully load
    if (document.readyState !== 'complete') {
        window.addEventListener('load', () => {
            triggerSettingsModal();
        });
    } else {
        triggerSettingsModal();
    }
}

function triggerSettingsModal() {
    // Try to trigger the settings modal
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.click();
    } else {
        // If the settings button is not found, try again after a short delay
        setTimeout(() => {
            const settingsBtn = document.getElementById('settings-btn');
            if (settingsBtn) {
                settingsBtn.click();
            }
        }, 100);
    }
}